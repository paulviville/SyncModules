import ModuleCore from "../Core/ModuleCore.js";

const commands = {
	setState: "SET_STATE",
	updateValue: "UPDATE_VALUE",
}

export default class ScalarModule extends ModuleCore {
	#value = 0;

	constructor ( UUID ) {
		console.log( `ScalarModule - constructor` );

		super( UUID, "ScalarModule" );
		
		this.setOnCommand( commands.updateValue );
	}

	onUpdateValue ( data ) {
		console.log( `ScalarModule - onUpdateValue` );

		const { value } = data;
		this.updateValue( value );
	}

	updateValue ( value, sync = false ) {
		console.log( `ScalarModule - updateValue` );
		console.log( value );

		this.#value = value;
		this.onChange( "updateValue", value );

		if ( sync ) {
			this.output( commands.updateValue, { value } );
		}
	} 

	get value ( ) {
		return this.#value;
	}

	getState ( ) {
		return { value: this.#value };
	}

	setState ( state ) {
		this.updateValue( state.value );
	}
}