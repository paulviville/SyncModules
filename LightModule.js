import TransformModule from "./TransformModule.js";

export default class LightModule extends TransformModule {
	static type = "LightModule";
	static commands = {
		...super.commands,
		setColor: "SET_COLOR",
		setIntensity: "SET_INTENSITY",
	}

	#color = [ 1, 1, 1 ];
	#intensity = 1;

	constructor ( UUID ) {
		console.log( "LightModule - constructor" );
		super( UUID );

		this.setOnCommand( this.commands.setColor, 
			( { color } ) => this.setColor( color )
		);

		this.setOnCommand( this.commands.setIntensity, 
			( { intensity } ) => this.setIntensity( intensity )
		);
	}

	setColor ( color, sync = false ) {
		this.#color.forEach( ( _, i ) => this.#color[ i ] = color[ i ] || 0 );

		this.onChange( this.commands.setColor, this.color );

		if ( sync ) {
			this.output( this.commands.setColor, { color: this.color } );
		}
	}

	setIntensity ( intensity, sync = false ) {
		this.#intensity = intensity;

		this.onChange( this.commands.setIntensity, this.intensity );

		if ( sync ) {
			this.output( this.commands.setIntensity, { intensity: this.intensity } );
		}
	}

	get color ( ) {
		return [ ...this.#color ];
	}

	get intensity ( ) {
		return this.#intensity;
	}

	getState ( ) {
		return {
			...super.getState( ),
			color: this.color,
			intensity: this.intensity,
		}
	}

	setState ( state ) {
		super.setState( state );
		this.setColor( state.color );
		this.setIntensity( state.intensity );
	}
}