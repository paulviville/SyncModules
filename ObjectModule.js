import ModuleCore from "./Core/ModuleCore.js";
import TransformModule from "./TransformModule.js";

const rootUUID = "00000000-0000-0000-0000-000000000000";

export default class ObjectModule extends TransformModule {
	static type = "ObjectModule";
	static commands = {
		...super.commands,
		addChildren: "ADD_CHILDREN",
		removeChildren: "REMOVE_CHILDREN",
	};

	#parent = rootUUID;
	#children = new Set( ); /// children modules UUID

	constructor ( UUID ) {
		console.log( `ObjectModule - constructor` );
	
		super( UUID );

		this.setOnCommand( this.commands.addChildren, 
			( { children } ) => this.addChildren( children ) 
		);

		this.setOnCommand( this.commands.removeChildren, 
			( { children } ) => this.removeChildren( children ) 
		);
	}

	get children ( ) {
		return [ ...this.#children ];
	}

	get parent ( ) {
		return this.#parent;
	}

	set _parent ( parentUUID ) {
		this.#parent = parentUUID;
	}

	get isObject ( ) {
		return true;
	}

	/// children : array of module UUIDs
	/// require to be descendants of ObjectModule
	addChildren ( children, sync = false ) {
		const addedChildren = [ ];

		for ( const child of children ) {
			if ( child == this.UUID ) {
				continue;
			}

			const module = this.registry.getModule( child );
			if ( module?.isObject ) {
				module._parent = this.UUID;
				addedChildren.push( child );
				this.#children.add( child );
			}
		}

		this.onChange( this.commands.addChildren, addedChildren );
		
		if ( sync ) {
			this.output( this.commands.addChildren, { children: addedChildren } );
		}
	}

	removeChildren ( children, sync = false ) {
		const removedChildren = [ ];

		for ( const child of children ) {
			const module = this.registry.getModule( child );
			if ( module && this.#children.has( child ) ) {
				module._parent = rootUUID; 
				removedChildren.push( child );
				this.#children.delete( child );
			}
		}

		this.onChange( this.commands.addChildren, removedChildren );
		
		if ( sync ) {
			this.output( this.commands.addChildren, { children: removedChildren } );
		}
	}

	getState ( ) {
		return {
			...super.getState( ),
			children: this.children,
		}
	}

	setState ( state ) {
		super.setState( state );
		this.addChildren( state.children );
	}

	delete ( ) {
		if ( this.parent != rootUUID ) {
			const parentModule = this.registry.getModule( this.parent );
			parentModule.removeChildren( [ this.UUID ], true );
		}

		this.removeChildren( this.children, true );
	}
}