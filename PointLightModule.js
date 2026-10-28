import LightModule from "./LightModule.js";

export default class PointLightModule extends LightModule {
	static type = "PointLightModule";
	static commands = {
		...super.commands,
		setDistance: "SET_DISTANCE",
		setDecay: "SET_DECAY",
	}

	#distance = 0;
	#decay = 2;

	constructor ( UUID ) {
		console.log( "PointLightModule - constructor" );
		super( UUID );

		this.setOnCommand( this.commands.setDistance, 
			( { distance } ) => this.setDistance( distance )
		);

		this.setOnCommand( this.commands.setDecay, 
			( { decay } ) => this.setDecay( decay )
		);
	}

	setDistance ( distance, sync = false ) {
		this.#distance = distance;

		this.onChange( this.commands.setDistance, this.distance );

		if ( sync ) {
			this.output( this.commands.setDistance, { distance: this.distance } );
		}
	}

	setDecay ( decay, sync = false ) {
		this.#decay = decay;

		this.onChange( this.commands.setDecay, this.decay );

		if ( sync ) {
			this.output( this.commands.setDecay, { decay: this.decay } );
		}
	}

	get distance ( ) {
		return this.#distance;
	}

	get decay ( ) {
		return this.#decay;
	}

	getState ( ) {
		return {
			...super.getState( ),
			distance: this.distance,
			decay: this.decay,
		}
	}

	setState ( state ) {
		super.setState( state );
		this.setDistance( state.color );
		this.setDecay( state.decay );
	}
}