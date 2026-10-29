import LightModule from "./LightModule.js";

export default class DirectionalLightModule extends LightModule {
	static type = "DirectionalLightModule";
	static commands = {
		...super.commands,
		setTarget: "SET_TARGET",
	}

	#target = [ 0, 0, 0 ];

	constructor ( UUID ) {
		super( UUID );

		this.setOnCommand( this.commands.setTarget, 
			( { target } ) => this.setTarget( target )
		);
	}

	setTarget ( target, sync = false ) {
		this.#target.forEach( ( _, i ) => this.#target[ i ] = target[ i ] || 0 );
		this.onChange( this.commands.setTarget, this.target );

		if ( sync ) {
			this.output( this.commands.setTarget, { target: this.target } );
		}
	}

	get target ( ) {
		return [ ...this.#target ];
	}

	getState ( ) {
		return {
			...super.getState( ),
			target: this.target,
		}
	}

	setState ( state ) {
		super.setState( state );
		this.setTarget( state.target );
	}
}