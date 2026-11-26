import ModuleTypes from "./Core/ModuleTypes.js";
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

ModuleTypes.register( BezierCurveModule );
