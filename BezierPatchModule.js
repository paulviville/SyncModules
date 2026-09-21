import PointsModule from "./PointsModule.js";

export default class BezierPatchModule extends PointsModule {
	static type = "BezierPatchModule";
	static commands = {
		...super.commands,
	};

	constructor ( UUID ) {
		console.log( `BezierPatchModule - constructor` );

		super( UUID );

		this.addPoints( [
			{ UUID: 0, position: [ -1.5, -1.5, 0 ] },
			{ UUID: 1, position: [ -0.5, -1.5, 0 ] },
			{ UUID: 2, position: [ 0.5, -1.5, 0 ] },
			{ UUID: 3, position: [ 1.5, -1.5, 0 ] },

			{ UUID: 4, position: [ -1.5, -0.5, 0 ] },
			{ UUID: 5, position: [ -0.5, -0.5, 0 ] },
			{ UUID: 6, position: [ 0.5, -0.5, 0 ] },
			{ UUID: 7, position: [ 1.5, -0.5, 0 ] },

			{ UUID: 8, position: [ -1.5, 0.5, 0 ] },
			{ UUID: 9, position: [ -0.5, 0.5, 0 ] },
			{ UUID: 10, position: [ 0.5, 0.5, 0 ] },
			{ UUID: 11, position: [ 1.5, 0.5, 0 ] },

			{ UUID: 12, position: [ -1.5, 1.5, 0 ] },
			{ UUID: 13, position: [ -0.5, 1.5, 0 ] },
			{ UUID: 14, position: [ 0.5, 1.5, 0 ] },
			{ UUID: 15, position: [ 1.5, 1.5, 0 ] },
		] );

	}
}