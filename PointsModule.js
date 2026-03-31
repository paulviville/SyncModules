import ModuleCore from "./Core/ModuleCore.js";

export default class PointsModule extends ModuleCore {
	static type = "PointsModule";
	static commands = {
		...super.commands,
		addPoint: "ADD_POINTS",
		removePoint: "REMOVE_POINTS",
		updatePoint: "UPDATE_POINTS",
	}

	#points = new Map( ); /// UUID -> [ x, y, z ]

	constructor ( UUID ) {
		console.log( `PointsModule - constructor` );

		super( UUID );

		this.setOnCommand( this.commands.addPoint, 
			( { points } ) => this.addPoints( points )
		);
		this.setOnCommand( this.commands.removePoint, 
			( { points } ) => this.removePoints( points )
		);
		this.setOnCommand( this.commands.updatePoint, 
			( { points } ) => this.updatePoints( points )
		);
	}

	get pointsUUIDs ( ) {
		return [ ...this.#points.keys( ) ];
	}

	getPoint ( pointUUID ) {
		return this.#points.get( pointUUID );
	}

	addPoints ( point ) { }
	removePoints ( point ) { }
	updatePoints ( point ) { }

	getState ( ) {
		const state = {

		}

		for ( const [ UUID, point ] of this.#points ) {

		}

		return state;
	}

	setState ( state ) {

	}
}