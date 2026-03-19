import ModuleCore from "./Core/ModuleCore.js";

const commands = {
	setState: "SET_STATE",
	updateVector: "UPDATE_VECTOR",
}

export default class Vector3Module extends ModuleCore {
	#vector = [0, 0, 0];
	
	constructor ( UUID ) {
		console.log( `Vector3Module - constructor` );

		super( UUID, "Vector3Module" );
		
		this.setOnCommand( commands.updateVector, ( data ) => this.onUpdateVector( data ) );
	}

	onUpdateVector ( data ) {
		console.log( `Vector3Module - onUpdateVector` );

		const { vector } = data;
		this.updateVector( vector );
	}

	updateVector ( vector, sync = false ) {
		console.log( `Vector3Module - updateVector` );

		this.#vector[ 0 ] = vector[ 0 ] || 0;
		this.#vector[ 1 ] = vector[ 1 ] || 0;
		this.#vector[ 2 ] = vector[ 2 ] || 0;

		this.onChange( "updateValue", value );


		if ( sync ) {
			this.output( commands.updateVector, { vector } );
		}
	}

	get vector ( ) {
		return [ ...this.#vector ];
	}

	getState ( ) {
		return { vector: this.vector };
	}

	setState ( state ) {
		console.log( `Vector3Module - setState` );
		
		this.updateValue( state.vector );
	}
}