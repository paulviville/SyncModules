import ModuleCore from "./Core/ModuleCore.js";

export default class SkeletonModule extends ModuleCore {
	static type = "SkeletonModule";
	static commands = {
		...super.commands,
		setBones: "SET_BONES",
		setTransforms: "SET_TRANSFORMS",
	}

	#bones = new Set( );
	#parents = new Map( );
	#children = new Map( );
	#transforms = new Map( );

	constructor ( UUID ) {
		console.log( `SkeletonModule - constructor` );

		super( UUID );
		this.setOnCommand( this.commands.setBones,
			( { bones } ) => this.setBones( bones )
		);
	}

	get bones ( ) {
		const bonesData = [ ];
		this.#bones.forEach( 
			UUID => bonesData.push( { UUID, parent: this.#parents.get( UUID ) } )
		);
		return bonesData;
	}

	get transforms ( ) {
		
	}

	boneTransforms ( boneUUIDs ) {

	}

	/// bones = [ 
	///		{ UUID, parent },
	///		{ UUID, parent },
	///		{ UUID, parent },
	/// ]
	setBones ( bones, sync = false ) {
		console.log(bones)
		for ( const { UUID, parent } of bones ) {
			// this.#bones.add( bone)
			console.log( UUID, parent );
			this.#bones.add( UUID );
			this.#parents.set( UUID, parent );
		}

		this.onChange( this.commands.setBones, { bones: this.bones } );

		if ( sync ) {
			this.output( this.commands.setBones, { bones: this.bones } );
		}
	}

	setTransforms ( boneTransforms, sync = false ) {

	}

	getState ( ) {
		return {
			...super.getState( ),
		}
	}

	setState ( state ) {
		super.setState( state );
	}
}