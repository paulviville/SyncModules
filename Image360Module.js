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
	}

	getState ( ) {
		return {
			...super.getState( ),
		};
	}

	setState ( state ) {
		super.setState( state );
	}
}