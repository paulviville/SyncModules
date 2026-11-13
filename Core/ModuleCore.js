export default class ModuleCore {
	static type = "ModuleCore";
	static commands = {
		any: "ANY",
		setState: "SET_STATE",
		setLabel: "SET_LABEL",
	}

	#UUID;
	#label;

	#outputFn;
	#commandCallbacks = new Map( ); /// command name -> callback function
	#changeCallbacks = new Map( );

	#registry;

	constructor ( UUID = crypto.randomUUID( ), label ) {
		this.#UUID = UUID;

		this.#label = label ?? this.type;

		this.setOnCommand( this.commands.setState, ( stateData ) => {
			this.setState( stateData );
		} );

		this.setOnCommand( this.commands.setLabel, ( { label } ) => {
			this.setLabel( label );
		} );
	}

	get UUID ( ) {
		return this.#UUID;
	}

	get type ( ) {
		return this.constructor.type;
	}

	get commands ( ) {
		return Object.freeze( this.constructor.commands );
	}

	get registry ( ) {
		return this.#registry;
	}

	setOutputFn ( outputFn ) {
		this.#outputFn = outputFn;
	}

	setRegistry ( registry ) {
		this.#registry = registry;
	}

	input ( payload ) {
		const { command, data } = this.decode( payload );
		this.onCommand( command, data );
	}

	output ( command, data ) {
		const payload = this.encode( command, data );
		this.#outputFn?.( payload );
	}

	/// placeholders
	decode ( payload ) {
		/// data -> commandDataDecoder( command, data )
		return payload;
	}

	encode ( command, data ) {
		const payload = { moduleUUID: this.#UUID, timestamp: Date.now( ), command, data };
		/// data -> commandDataEncoder( command, data )
		return payload;
	}
	///

	setOnCommand ( command, callback ) {
		if ( !this.#commandCallbacks.has( command ) ) {
			this.#commandCallbacks.set( command, [ ] );
		}

		this.#commandCallbacks.get( command ).push( callback );
	}

	onCommand ( command, data ) {
		if ( this.#commandCallbacks.has( command ) ) {
			const callbacks = this.#commandCallbacks.get( command );
			callbacks.forEach( callback => callback( data ) );
		} else {
			console.warn( `${ this.type } - ${ this.#UUID }  - has no handler for ${ command }`);
		}
	}

	setOnChange ( change, callback ) {
		if ( !this.#changeCallbacks.has( change ) ) {
			this.#changeCallbacks.set( change, [ ] );
		}

		this.#changeCallbacks.get( change ).push( callback );
	}

	onChange ( change, data ) {
		if ( this.#changeCallbacks.has( change ) ) {
			const callbacks = this.#changeCallbacks.get( change );
			callbacks.forEach( callback => callback( data ) );
		}

		if ( this.#changeCallbacks.has( this.commands.any ) ) {
			const callbacks = this.#changeCallbacks.get( this.commands.any );
			callbacks.forEach( callback => callback( data ) );
		}
	}

	get label ( ) {
		return this.#label;
	}

	setLabel ( label, sync = false ) {
		this.#label = label;

		this.onChange( this.commands.setLabel, this.label );

		if ( sync ) {
			this.output( this.commands.setLabel, { label: this.label } );
		}
	}

	/// overload in children
	getState ( ) {
		return { label: this.#label };
	}

	/// overload in children
	setState ( state ) {
		this.setLabel( state.label );
	}

	outputState ( ) {
		const state = this.getState( );
		return this.encode( this.commands.setState, state );
	}

	delete ( ) {

	}
}