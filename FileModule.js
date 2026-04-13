import ModuleCore from "./Core/ModuleCore.js";

export default class FileModule extends ModuleCore {
	static type = "FileModule";
	static commands = {
		...super.commands,
		updateFile: "UPDATE_FILE",
	};

	#file = undefined; 
	// { name, type, data }

	constructor ( UUID ) {
		console.log( `FileModule - constructor` );

		super( UUID );
		this.setOnCommand( this.commands.updateFile,
			( { file } ) => this.updateFile( file )
		);
	}

	updateFile ( file, sync = false ) {
		console.log( `FileModule - updateFile` );
		// console.log( file )

		/// delete previous file?
		this.#file = file;

		/// DEBUG
		const base64 = file.data.split( ',' )[ 1 ];
		const binary = atob( base64 );
		const bytes = new Uint8Array( binary.length );
		for ( let i = 0; i < binary.length; ++i ) {
			bytes[ i ] = binary.charCodeAt( i );
		}
		console.log( binary )
		/// end DEBUG


		this.onChange( this.commands.updateFile, this.file );

		if ( sync ) {
			this.output( this.commands.updateFile, { file: this.file } );
		}
	}

	get file ( ) {
		return { ...this.#file };
	}

	getState ( ) {
		return { file: this.file };
	}

	setState ( state ) {
		this.updateFile( state.file );
	}
}