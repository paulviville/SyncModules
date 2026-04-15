import FileModule from "./FileModule.js";

export default class GLTFModule extends FileModule {
	static type = "GLTFModule";
	static commands = {
		...super.commands,
		setSceneGraph: "SET_SCENE_GRAPH",
		clear: "CLEAR",
		/// TODO
	};

	#sceneGraph = new SceneGraph( );

	constructor ( UUID ) {
		console.log( `GLTFModule - constructor` );

		super( UUID );
	}

	onSetSceneGraph ( ) {
		
	}

	getState ( ) {
		return { 
			...super.getState( ),
		};
	}

	setState ( state ) {
		super.setState( state );
	}
}

// export class SceneNode {
// 	#UUID;
// 	#name;
// 	#parent = undefined;
// 	#children = new Set ( );
// 	#transform = {
// 		translation: [ 0, 0, 0 ],
// 		rotation: [ 0, 0, 0, 1 ],
// 		scale: [1, 1, 1 ]
// 	}

// 	constructor ( UUID ) {
// 		this.#UUID = UUID;
// 	}

// 	get UUID ( ) {
// 		return this.#UUID;
// 	}

// 	get transform ( ) {
// 		return {
// 			translation: [ ...this.#transform.translation],
// 			rotation: [ ...this.#transform.rotation],
// 			scale: [ ...this.#transform.scale],
// 		}
// 	}
// }

// node = {
// 	UUID, 
// 	parent, // UUID 
// 	children, // [ UUID ]
// 	transform, // { translation, rotation, scale }
// 	name, // string
// }

export class SceneGraph {

	#nodes = new Set( );
	#roots = new Set( );
	#parent = new Map( );
	#children = new Map( );
	#transform = new Map( );

	constructor ( ) {

	}

	addNode ( node ) {
		const { UUID, parent, children, transform } = node;
		this.#nodes.add( UUID );
		
		this.#parent.set( UUID, parent );
		if ( parent === undefined ) 
			this.#roots.add( UUID );

		this.#children.set( UUID, [ ...( children ?? [ ] ) ] );

		this.#transform.set( UUID, {
			translation: [ ...( transform?.translation ?? [ 0, 0, 0 ] ) ],
			rotation: [ ...( transform?.rotation ?? [ 0, 0, 0, 1 ] ) ],
			scale: [ ...( transform?.scale ?? [ 1, 1, 1 ] ) ],
		} );
	}

	get nodeUUIDs ( ) {
		return [ ...this.#nodes ];
	}

	clear ( ) {
		this.#nodes.clear( );
		this.#roots.clear( );
		this.#parent.clear( );
		this.#children.clear( );

	}
	// addRoot ( nodeUUID ) {
	// 	this.#roots.add( nodeUUID );
	// }
}