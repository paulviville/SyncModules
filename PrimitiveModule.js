import ModuleCore from "./Core/ModuleCore.js";
import TransformModule from "./TransformModule.js";

export default class PrimitiveModule extends TransformModule {
	static type = "PrimitiveModule";
	static commands = {
		...super.commands,
		updatePrimitive: "UPDATE_PRIMITIVE",
		updateColor: "UPDATE_COLOR",
	};

	#primitiveTypes = {
		Sphere: "Sphere",
		Cube: "Cube",
		Cone: "Cone",
		Cylinder: "Cylinder",
		Capsule: "Capsule",
		Quad: "Quad",
	};

	#primitive = this.#primitiveTypes.Sphere;
	#color = [ 1, 1, 1, 1 ];

	constructor ( UUID ) {
		console.log( `PrimitiveModule - constructor` );

		super( UUID );

		this.setOnCommand( this.commands.updatePrimitive,
			( { primitive } ) => this.updatePrimitive( primitive )
		);

		this.setOnCommand( this.commands.updateColor,
			( { color } ) => this.updateColor( color )
		);
	}

	get primitive ( ) {
		return this.#primitive;
	}

	get color ( ) {
		return [ ...this.#color ];
	}

	get primitiveTypes ( ) {
		return { ...this.#primitiveTypes };
	}

	updatePrimitive ( primitive, sync = false ) {
		// console.log( `PrimitiveModule - updatePrimitive` );

		this.#primitive = primitive; /// TODO: TYPE CHECK?

		this.onChange( this.commands.updatePrimitive, primitive );

		if ( sync ) {
			this.output( this.commands.updatePrimitive, { primitive: this.primitive } );
		}
	}

	updateColor ( color, sync = false ) {
		this.#color.forEach( ( _, i ) => this.#color[ i ] = color[ i ] || 0 );
		console.log( color.color, this.#color )

		this.onChange( this.commands.updateColor, this.color );

		if ( sync ) {
			this.output( this.commands.updateColor, { color: this.color } );
		}
	}

	getState ( ) {
		return {
			...super.getState( ),
			primitive: this.primitive,
			color: this.color,
		};
	}

	setState ( state ) {
		super.setState( state );
		this.updatePrimitive( state.primitive );
		this.updateColor( state.color );
	}
}