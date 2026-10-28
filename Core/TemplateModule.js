/* 
	Template to copy to add a new module
	Extend module core (or child of module core), inherit the commands, add the new ones, set the type.

	in constructor add the OnCommand callbacks

	specialize the get and set state

	Add the new type to ModuleTypes to be callable by ModuleRegistry
*/

import ModuleCore from "./ModuleCore.js";

/// create new class and inherit from ModuleCore, or child class of ModuleCore
export default class TemplateModule extends ModuleCore {
	/// set the module type
	static type = "TemplateModule";

	/// inherit parent commands and add your own
	static commands = {
		...super.commands,
		templateCommand: "TEMPLATE_COMMAND",
	};

	/// new properties of the module type
	#templateProperty = "templateProperty";


	constructor ( UUID ) {
		/// call the parent constructor
		super( UUID );
		
		/// set callbacks for new commands
		this.setOnCommand( this.commands.templateCommand, 
			( templateData ) => this.templateMethod( templateData )
		);
	}

	/// write one method per property to change and synchronize
	templateMethod ( templateData, sync = false ) {
		/// extract propreties to change from the data
		const { templateProperty } = templateData;

		/// call the change call back for views/gui/local changes
		this.onChange( this.commands.templateMethod, this.transform );

		/// if to be synchronized, output the command and the data
		if ( sync ) {
			this.output( this.commands.templateMethod, { templateData: templateData } );
		}
	}


	get templateProperty ( ) {
		/// when pertinent, return deep copy;
		return this.#templateProperty;
	}

	getState ( ) {
		return { 
			/// get parent state
			...super.getState( ), 
			/// add new calls to get the state of new properties
			templateProperty: this.templateProperty,
		};
	}

	setState ( state ) {
		/// set parent state
		super.setState( state );
		/// add new calls to set the state of new properties
		this.templateMethod( state.templateProperty );
	}
}