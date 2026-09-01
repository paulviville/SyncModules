import ModuleCore from "./Core/ModuleCore.js";

export default class SwitchModule extends ModuleCore {
	static type = "SwitchModule";
	static commands = {
		...super.commands,
		toggle: "TOGGLE"
	}

	#value = false;

	constructor ( UUID ) {
		console.log( `SwitchModule - constructor` );
		super( UUID );

		this.setOnCommand( this.commands.toggle,
			( ) => this.toggle( )
		);
	}

	get value ( ) {
		return this.#value;
	}

	toggle ( value, sync = false ) {
		console.log( `SwitchModule - toggle` );

		this.#value = value;
		this.onChange( this.commands.toggle, { value } );

		if ( sync ) {
			this.output( this.commands.toggle, { value } );
		}
	}

	getState ( ) {
		return { value: this.#value };
	}

	setState ( state ) {
		this.toggle( state.value );
	}
}