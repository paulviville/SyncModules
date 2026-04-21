import FileModule from "./FileModule.js";

const ROOT_UUID = "00000000-0000-0000-0000-000000000000";

export default class GLTFModule extends FileModule {
	static rootUUID =  "00000000-0000-0000-0000-000000000000";

	static type = "GLTFModule";
	static commands = {
		...super.commands,
		setSceneGraph: "SET_SCENE_GRAPH",
		setNodes: "SET_NODES",
		updateNodes: "UPDATE_NODES",
		clear: "CLEAR",
		/// TODO
	};

	#sceneGraph = new SceneGraph( );

	constructor ( UUID ) {
		console.log( `GLTFModule - constructor` );

		super( UUID );

		this.setOnCommand( this.commands.setNodes,
			( { nodes } ) => this.setNodes( nodes )
		);
		this.setOnCommand( this.commands.updateNodes,
			( { nodes } ) => this.updateNodes( nodes )
		);
	}

	setNodes ( nodes, sync = false ) {
		const nodeUUIDs = [ ];
		for ( const node of nodes ) {
			this.#sceneGraph.addNode( node );
			nodeUUIDs.push( node.UUID );
		}

		const nodesData = this.#sceneGraph.nodesData( nodeUUIDs );
		console.log(nodesData)

		this.onChange( this.commands.setNodes, nodesData );

		if ( sync ) {
			this.output( this.commands.setNodes, { nodes: nodesData } );
		}
	}

	updateNodes ( nodes, sync = false ) {
		const nodeUUIDs = [ ];
		for ( const node of nodes ) {
			this.#sceneGraph.updateNode( node );
			nodeUUIDs.push( node.UUID );
		}

		console.log( nodes );

		const nodesData = this.#sceneGraph.nodesData( nodeUUIDs );

		this.onChange( this.commands.updateNodes, nodesData );

		if ( sync ) {
			this.output( this.commands.updateNodes, { nodes: nodesData } );
		}
	}

	getState ( ) {
		return { 
			...super.getState( ),
			nodes: this.#sceneGraph.nodes,
		};
	}

	setState ( state ) {
		super.setState( state );
	}
}

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
		
		this.#parent.set( UUID, parent ?? ROOT_UUID );
		if ( this.#parent.get( UUID ) == ROOT_UUID )
			this.#roots.add( UUID ); 

		this.#children.set( UUID, new Set( children ?? [ ] ) );

		this.#transform.set( UUID, {
			translation: [ ...( transform?.translation ?? [ 0, 0, 0 ] ) ],
			rotation: [ ...( transform?.rotation ?? [ 0, 0, 0, 1 ] ) ],
			scale: [ ...( transform?.scale ?? [ 1, 1, 1 ] ) ],
		} );
	}

	updateNode ( node ) {
		const { UUID, parent, children, transform } = node;
		if ( !this.#nodes.has( UUID ) ) {
			return;
		}

		if ( parent ) {
			this.#parent.set( UUID, parent );
		}

		if ( children ) {
			this.#children.get( UUID ).clear( );			
			this.#children.set( UUID, new Set( children ) );			
		}

		if ( transform ) {
			const { translation, rotation, scale } = transform;
			const nodeTransform = this.#transform.get( UUID );
			if ( translation ) {
				nodeTransform.translation.forEach( ( _, i ) => nodeTransform.translation[ i ] = translation[ i ] || 0 );
			}
			if ( rotation ) {
				nodeTransform.rotation.forEach( ( _, i ) => nodeTransform.rotation[ i ] = rotation[ i ] || 0 );
			}
			if ( scale ) {
				nodeTransform.scale.forEach( ( _, i ) => nodeTransform.scale[ i ] = scale[ i ] || 1 );
			}
		}
	}

	get nodeUUIDs ( ) {
		return [ ...this.#nodes ];
	}

	nodeTransform ( nodeUUID ) {
		const transform = this.#transform.get( nodeUUID );

		return {
			translation: [ ...transform.translation ],
			rotation: [ ...transform.rotation ],
			scale: [ ...transform.scale ],
		}
	}

	nodeParent ( nodeUUID ) {
		return this.#parent.get( nodeUUID );
	}

	nodeChildren ( nodeUUID ) {
		const children = this.#children.get( nodeUUID );
		return [ ...( children ?? [ ] ) ];
	}

	nodesData ( nodeUUIDs ) {
		const nodes = [ ];

		for ( const UUID of nodeUUIDs ) {
			nodes.push( {
				UUID: UUID,
				parent: this.nodeParent( UUID ),
				children: this.nodeChildren( UUID ),
				transform: this.nodeTransform( UUID ),
			} );
		}

		return nodes;
	}

	clear ( ) {
		this.#nodes.clear( );
		this.#roots.clear( );
		this.#parent.clear( );
		this.#children.clear( );
	}

	get nodes ( ) {
		const nodes = this.nodesData( [ ...this.#nodes ] );

		return nodes;
	}
}