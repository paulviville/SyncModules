import PointsModule from "./PointsModule.js";

export default class BezierCurveModule extends PointsModule {
	static type = "BezierCurveModule";
	static commands = {
		...super.commands,
	};

	constructor ( UUID ) {
		console.log( `BezierCurveModule - constructor` );

		super( UUID );
	}
}