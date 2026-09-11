import TransformModule from "./TransformModule.js";


export default class DisplaysModule extends TransformModule {
	static type = "DisplaysModule";
	static commands = {
		...super.commands,
		addDisplay: "ADD_DISPLAY",
		setMatrices: "SET_MATRICES",
	};
	///		2 ------- 3
	///     | Corners |
	///     0 ------- 1
	/*
		display = {
			label: < string >,
			UUID: < uuid >,
			corners: [ [ <3 * float> ], [ <3 * float> ], [ <3 * float> ], [ <3 * float> ] ],
			matrices: [ <16 * float> ],
		}
	*/
	#displays = new Map( ); /// UUID -> display

	constructor ( UUID ) {
		console.log( `DisplaysModule - constructor` );

		super( UUID );

		this.setOnCommand( this.commands.addDisplay, 
			( { display } ) => this.addDisplay( display )
		);

		this.setOnCommand( this.commands.setMatrices, 
			( { matrices } ) => this.setMatrices( matrices )
		);
	}

	get displays ( ) {
		const displays = [ ];
		for ( const [ UUID, display ] of this.#displays ) {
			displays.push( display );
		}

		return displays;
	}

	/// display: { UUID, }
	addDisplay ( displayData, sync = false ) {
		let { label, UUID, corners } = displayData;
		const display = {
			label: label || `${ UUID }`,
			UUID: UUID,
			corners: corners.map( corner => {
				return [ ...corner ];
			} ),
		}

		this.#displays.set( display.UUID, display );

		this.onChange( this.commands.addDisplay, display );

		if( sync ) {
			this.output( this.commands.addDisplay, { display } );
		}
	}

	/// displayUUID, matrices: [ { camera, persepective }, ... ]
	setMatrices ( matrices, sync = false ) {
		const { projection, view, UUID } = matrices;
		
		const display = this.#displays.get( UUID );
		if ( display === undefined )
			return;

		display.matrices ??= { };

		if ( matrices.view )
			display.matrices.view = [ ...matrices.view ];
		if ( matrices.projection )
			display.matrices.projection = [ ...matrices.projection ];

		this.onChange( this.commands.setMatrices, matrices );

		if( sync ) {
			this.output( this.commands.setMatrices, { matrices } );
		}
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