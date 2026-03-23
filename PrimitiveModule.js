import ModuleCore from "./Core/ModuleCore.js";
import TransformModule from "./TransformModule.js";

export default class PrimitiveModule extends TransformModule {
	static type = "PrimitiveModule";
	static commands = {
		...super.commands,
		updatePrimitive: "UPDATE_PRIMITIVE",
	};

	#primitiveTypes = {
		Sphere: "Sphere",
		Box: "Box",
	};

	#primitive = this.#primitiveTypes.Sphere;

	constructor ( UUID ) {
		console.log( `PrimitiveModule - constructor` );

		super( UUID );

		this.setOnCommand( this.commands.updatePrimitive, ( data ) => this.onUpdatePrimitive( data ) )
	}

	get primitive ( ) {
		return this.#primitive;
	}

	get primitiveTypes ( ) {
		return { ...this.#primitiveTypes };
	}

	onUpdatePrimitive ( data ) {
		console.log( `PrimitiveModule - onUpdatePrimitive` );

		const { primitive } = data;
		this.updatePrimitive( primitive );
	}

	updatePrimitive ( primitive, sync = false ) {
		console.log( `PrimitiveModule - updatePrimitive` );

		this.#primitive = primitive; /// TODO: TYPE CHECK?

		this.onChange( this.commands.updatePrimitive, primitive );

		if ( sync ) {
			this.output( this.commands.updatePrimitive, { primitive: this.primitive } );
		}
	}

	getState ( ) {
		return {
			transform: this.transform,
			primitive: this.primitive,
		};
	}

	setState ( state ) {
		this.updateTransform( state.transform );
		this.updatePrimitive( state.primitive );
	}
}