import FileModule from "./FileModule.js";

export default class MeshModule extends FileModule {
	static type = "MeshModule";
	static commands = {
		...super.commands,
		clear: "CLEAR",
		updateTransform: "UPDATE_TRANSFORM",
		updateBoundingBox: "UPDATE_BOUNDINGBOX",
	};

	constructor ( UUID ) {
		console.log( `MeshModule - constructor` );

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