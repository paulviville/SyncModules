import ModuleCore from "./Core/ModuleCore.js";

export default class FileModule extends ModuleCore {
	static type = "FileModule";
	static commands = {
		...super.commands,
		updateFile: "UPDATE_FILE",
	};

	#file = undefined;

	constructor ( UUID ) {
		console.log( `FileModule - constructor` );

		super( UUID );
		this.setOnCommand( this.commands.updateFile,
			( { file } ) => this.updateFile( file )
		);
	}

	updateFile ( file, sync = false ) {
		console.log( `FileModule - updateFile` );

		/// delete previous file?
		this.#file = file;

		this.onChange( this.commands.updateLine, this.file );

		if ( sync ) {
			this.output( this.commands.updateLine, { file: this.file } );
		}
	}

	get file ( ) {
		return this.#file;
	}

	getState ( ) {
		return { file: this.#file };
	}

	setState ( state ) {
		this.updateFile( state.file );
	}
}