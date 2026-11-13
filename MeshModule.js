import ObjectModule from "./ObjectModule.js";

export default class MeshModule extends ObjectModule {
	static type = "MeshModule";

	static commands = {
		...super.commands,
		setData: "SET_DATA",
		setBoundingBox: "SET_BOUNDING_BOX",
	};

	#data;

	constructor ( UUID ) {
		console.log( `MeshModule - constructor` );

		super( UUID );

		this.setOnCommand( this.commands.setData, 
			( { data } ) => this.setData( data )
		);
	}

	get data ( ) {
		return this.#data;
	}

	setData ( data, sync = false ) {
		this.#data = data;

		this.onChange( this.commands.setData, this.data );

		if ( sync ) {
			this.output( this.commands.setData, { data: this.data } );
		}
	}

	/// temp debug
	updateFile ( data, sync = false ) { this.setData ( data, sync ) }
	setNodesMap( ) { }
	setNodes( ) { }
	///
	
	getState ( ) {
		return { 
			...super.getState( ),
			data: this.data,
		};
	}

	setState ( state ) {
		super.setState( state );
		this.setData( state.data );
	}
}