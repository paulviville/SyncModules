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

		const UUID = "00000000-0000-0000-0000-000000000000";
		super ( UUID, "ModulesRegistry" );

		this.#modules.set( UUID, this );

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

		const { UUID } = data;
		console.log( UUID );


	}

	addModule ( type, UUID, sync = false ) {
		console.log( `ModulesRegistry - addModule` );

		const constructor = ModuleTypes[ type ];
		const module = new constructor( UUID );
		module.setOutputFn( this.#outputFn );
		this.#modules.set( module.UUID, module );

		if ( sync ) {
			this.output( commands.addModule, { type, UUID } );
		}

		// this.onChange( 'addModule', module );
	}

	removeModule ( UUID, sync = false ) {
		console.log( `ModulesRegistry - removeModule` );

		const module = this.#modules.get( UUID );
		if ( module !== undefined ) {

			// this.onChange( 'removeModule', module );

			module.delete( );
			this.#modules.delete( UUID );

			if ( sync ) {
				this.output( commands.removeModule, { UUID } );
			}
		}
	}

	get modules ( ) {
		return this.#modules;
	}

	get modulesList ( ) {
		return [ ...this.#modules.keys( ) ];
	}

	getModule ( moduleUUID ) {
		console.log( `ModulesRegistry - getModule ${ moduleUUID }` );

		return this.#modules.get( moduleUUID );
	}

	getState ( ) {
		const modulesData = [];
		for ( const [ UUID, module ] of this.#modules ) {
			if ( module.type == "ModulesRegistry" ) 
				continue;

			modulesData.push( { UUID, type: module.type } );
		}

		return { modulesData }
	}

	setState ( state ) {
		for ( const moduleData of state.modulesData ) {
			const { UUID, type } = moduleData;
			this.addModule( type, UUID );
		}
	}
}