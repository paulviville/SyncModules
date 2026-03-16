import ModuleCore from "./ModuleCore.js";
import ModuleTypes from "./ModuleTypes.js";

const commands = {
	setState: "SET_STATE",
	addModule: "ADD_MODULE",
	removeModule: "REMOVE_MODULE",
}

export default class ModulesRegistry extends ModuleCore {
	#modules = new Map( );
	#outputFn;

	constructor ( outputFn ) {
		console.log( `ModulesRegistry - constructor` );

		const uuid = "00000000-0000-0000-0000-000000000000";
		super ( uuid, "ModulesRegistry" );

		this.#outputFn = outputFn;
		this.setOutputFn( outputFn );

		this.setOnCommand( commands.addModule, ( data ) => this.onAddModule( data ) );
		this.setOnCommand( commands.removeModule, ( data ) => this.onRemoveModule( data ) );
	}
	
	setOutputFn( outputFn ) {
		console.log( `ModulesRegistry - setOutputFn` );

		super.setOutputFn( outputFn );
		this.#outputFn = outputFn;
	}

	onAddModule ( data ) {
		console.log( `ModulesRegistry - onAddModule` );
		const { type, UUID, ...moduleData } = data;
		console.log( type, UUID, moduleData );

		this.addModule( type, UUID, false );
	}

	onRemoveModule ( data ) {
		console.log( `ModulesRegistry - onRemoveModule` );

	}

	addModule ( type, UUID, sync = false ) {
		console.log( `ModulesRegistry - addModule` );

		const constructor = ModuleTypes[ type ];
		const module = new constructor( UUID );
		module.setOutputFn( this.#outputFn );
		this.#modules.set( module.UUID, module );
		console.log( this.modulesList );

		if ( sync ) {
			this.output( commands.addModule, { type, UUID } );
		}

		
	}

	get modules ( ) {
		return this.#modules;
	}

	get modulesList ( ) {
		return [ ...this.#modules.keys( ) ];
	}

}