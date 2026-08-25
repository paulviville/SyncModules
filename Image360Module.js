import ImageModule from "./ImageModule.js";


export default class Image360Module extends ImageModule {
	static type = "Image360Module";
	static commands = {
		...super.commands,
		setImage: "SET_IMAGE",
	};

	#image; /// file

	constructor ( UUID ) {
		console.log( `Image360Module - constructor` );

		super( UUID );

		// this.setOnCommand( this.commands.setImage, 
		// 	( { image } ) => this.setImage( image )
		// );
	}

	// get image ( ) {
	// 	return this.#image;
	// }

	// setImage ( image, sync = false ) {
	// 	console.log( `ImageModule - setImage` );

	// 	this.#image = image;

	// 	this.onChange( this.commands.setImage, { image: this.image } );

	// 	if ( sync ) {
	// 		this.output( this.commands.setImage, { image: this.image } );
	// 	}
	// }

	getState ( ) {
		return {
			...super.getState( ),
			// image: this.image
		};
	}

	setState ( state ) {
		super.setState( state );
		// this.setImage( state.image );
	}
}