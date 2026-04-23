import TransformModule from "./TransformModule.js";


export default class ImageModule extends TransformModule {
	static type = "ImageModule";
	static commands = {
		...super.commands,
		setImage: "SET_IMAGE",
	};

	#image; /// file

	constructor ( UUID ) {
		console.log( `ImageModule - constructor` );

		super( UUID );

		this.setOnCommand( this.commands.setImage, 
			( { camera } ) => this.setImage( camera )
		);
	}

	get image ( ) {
		return {
			...this.#image
		}
	}

	setImage ( image, sync = false ) {
		console.log( `ImageModule - setImage` );

		this.#image = image;

		this.onChange( this.commands.setImage, this.image );

		if ( sync ) {
			this.output( this.commands.setImage, { image: this.image } );
		}
	}

	getState ( ) {
		return {
			...super.getState( ),
			image: this.image
		};
	}

	setState ( state ) {
		super.setState( state );
		this.setImage( state.image );
	}
}