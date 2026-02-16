const commands = {
	setState: "SET_STATE",
}

export default class ModuleCore {
	#type;
	#UUID;
	
	#onCommandCallbacks = new Map( ); /// command name -> callback function
	#commandEncoders = new Map( );  /// command name -> { encodeFn, decodeFn }
	#onChangeCallbacks = new Map( ); ///



	constructor ( UUID = crypto.randomUUID( ), type = "ModuleCore" ) {
		console.log( `ModuleCore - constructor - ${ UUID } ${ type }` );

		this.#UUID = UUID;
		this.#type = type;
	}

	get UUID ( ) {
		return this.#UUID;
	}

	get type ( ) {
		return this.#type;
	}

	setOnChange ( changeType, callback ) {
		if ( !this.#onChangeCallbacks.has( changeType ) ) {
			this.#onChangeCallbacks.set( changeType, [ ] );
		}

		this.#onChangeCallbacks.get( changeType ).push( callback );
	}

	removeOnChange ( changeType, callback ) {
		if ( !this.#onChangeCallbacks.has( changeType ) ) {
			const callbacks = this.#onChangeCallbacks.get( changeType );
			const index = callbacks.indexOf( callback );
			if( index > -1 ) {
				callbacks.splice( index );
			}
		}
	}

	onChange ( changeType, data ) {
		if ( this.#onChangeCallbacks.has( changeType ) ) {
			const callbacks = this.#onChangeCallbacks.get( changeType );
			callbacks.forEach( callback => callback( data ) );
		}
	}

	setOnCommand ( commandType, callback ) {
		if ( !this.#onCommandCallbacks.has( commandType ) ) {
			this.#onCommandCallbacks.set( commandType, [ ] );
		}

		this.#onCommandCallbacks.get( commandType ).push( callback );
	}

	removeOnCommand ( commandType, callback ) {
		if ( !this.#onCommandCallbacks.has( commandType ) ) {
			const callbacks = this.#onCommandCallbacks.get( commandType );
			const index = callbacks.indexOf( callback );
			if( index > -1 ) {
				callbacks.splice( index );
			}
		}
	}

	onCommand ( commandType, data ) {
		if ( this.#onCommandCallbacks.has( commandType ) ) {
			const callbacks = this.#onCommandCallbacks.get( commandType );
			callbacks.forEach( callback => callback( data ) );
		}
	}
}