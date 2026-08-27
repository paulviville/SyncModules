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
		this.setOnCommand( this.commands.setTransforms,
			( { boneTransforms } ) => this.setTransforms( boneTransforms )
		);
	}

	get bones ( ) {
		const bonesData = [ ];
		for ( const UUID of this.#bones ) {
			bonesData.push( { UUID, parent: this.#parents.get( UUID ) } )
		}
		return bonesData;
	}

	get transforms ( ) {
		const boneTransforms = [ ];

		for ( const [ UUID, transform ] of this.#transforms ) {
			boneTransforms.push( { 
					UUID,
					transform: {
						translation: [ ...transform.translation ],
						rotation: [ ...transform.rotation ],
						scale: [ ...transform.scale ],
					}
			} );
		}
		return boneTransforms;
	}

	boneTransforms ( boneUUIDs ) {
		if ( boneUUIDs === undefined )
			return this.transforms;

		const boneTransforms = [ ];
		for ( const UUID of boneUUIDs ) {
			const transform = this.#transforms.get( UUID );
			boneTransforms.push( { 
					UUID,
					transform: {
						translation: [ ...transform.translation ],
						rotation: [ ...transform.rotation ],
						scale: [ ...transform.scale ],
					}
			} );
		}
		return boneTransforms;
	}

	/// bones = [ 
	///		{ UUID, parent },
	///		{ UUID, parent },
	///		{ UUID, parent },
	/// ]
	setBones ( bones, sync = false ) {
		// console.log( `SkeletonModule - setBones` );

		for ( const { UUID, parent } of bones ) {
			this.#bones.add( UUID );
			this.#parents.set( UUID, parent );

			const transform = {
				translation: [ 0, 0, 0 ],
				rotation: [ 0, 0, 0, 1 ],
				scale: [ 1, 1, 1 ],
			}
			this.#transforms.set( UUID, transform );
		}

		this.onChange( this.commands.setBones, { bones: this.bones } );

		if ( sync ) {
			this.output( this.commands.setBones, { bones: this.bones } );
		}
	}

	/// boneTransforms = [ 
	///		{ UUID, transform },
	///		{ UUID, transform },
	///		{ UUID, transform },
	/// ]

	/// transform = {
	/// 	translation: [ x, y, z ],
	/// 	rotation: [ i, j, k, w ],
	/// 	scale: [ x, y, z ],
	///}
	setTransforms ( boneTransforms, sync = false ) {
		// console.log( `SkeletonModule - setTransforms` );

		const updatedUUIDs = [ ];

		for ( const { UUID, transform } of boneTransforms ) {
			const boneTransform = this.#transforms.get( UUID );
			if ( boneTransform ) {
				updatedUUIDs.push( UUID );
				if ( transform.translation ) {
					boneTransform.translation.forEach( ( _, i ) => boneTransform.translation[ i ] = transform.translation[ i ] || 0 );
				}
				if ( transform.rotation ) {
					boneTransform.rotation.forEach( ( _, i ) => boneTransform.rotation[ i ] = transform.rotation[ i ] || 0 );
				}
				if ( transform.scale ) {
					boneTransform.scale.forEach( ( _, i ) => boneTransform.scale[ i ] = transform.scale[ i ] || 1 );
				}
			}
		}

		this.onChange( this.commands.setTransforms, { boneTransforms: this.boneTransforms( updatedUUIDs ) } );

		if ( sync ) {
			this.output( this.commands.setTransforms, { boneTransforms: this.boneTransforms( updatedUUIDs ) } );
		}
	}

	getState ( ) {
		return {
			...super.getState( ),
			bones: this.bones,
			boneTransforms: this.transforms,
		}
	}

	setState ( state ) {
		super.setState( state );
		this.setBones( state.bones );
		this.setTransforms( state.boneTransforms );
	}
}