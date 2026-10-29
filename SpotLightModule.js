import PointLightModule from "./PointLightModule.js";

export default class SpotLightModule extends PointLightModule {
	static type = "SpotLightModule";
	static commands = {
		...super.commands,
		setPenumbra: "SET_PENUMBRA",
		setAngle: "SET_ANGLE",
	}

	#distance = 0;
	#decay = 2;
	#penumbra = 0;
	#angle = Math.PI / 3;

	constructor ( UUID ) {
		super( UUID );

		this.setOnCommand( this.commands.setPenumbra, 
			( { penumbra } ) => this.setPenumbra( penumbra )
		);

		this.setOnCommand( this.commands.setAngle, 
			( { angle } ) => this.setAngle( angle )
		);
	}

	setPenumbra ( penumbra, sync = false ) {
		this.#penumbra = penumbra;

		this.onChange( this.commands.setPenumbra, this.penumbra );

		if ( sync ) {
			this.output( this.commands.setPenumbra, { penumbra: this.penumbra } );
		}
	}

	setAngle ( angle, sync = false ) {
		this.#angle = angle;

		this.onChange( this.commands.setAngle, this.angle );

		if ( sync ) {
			this.output( this.commands.setAngle, { angle: this.angle } );
		}
	}

	get penumbra ( ) {
		return this.#penumbra;
	}

	get angle ( ) {
		return this.#angle;
	}


	getState ( ) {
		return {
			...super.getState( ),
			angle: this.angle,
			penumbra: this.penumbra,
		}
	}

	setState ( state ) {
		super.setState( state );
		this.setPenumbra( state.penumbra );
		this.setAngle( state.angle );
	}
}