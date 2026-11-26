import ObjectModule from "./ObjectModule.js";

export default class OPrimitiveModule extends ObjectModule {
	static type = "OPrimitiveModule";
	static commands = {
		...super.commands,
		setPrimitive: "SET_PRIMITIVE",
		setColor: "SET_COLOR",
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
		console.log( `OPrimitiveModule - constructor` );

		super( UUID );

		this.setOnCommand( this.commands.setPrimitive,
			( { primitive } ) => this.setPrimitive( primitive )
		);

		this.setOnCommand( this.commands.setColor,
			( { color } ) => this.setColor( color )
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

	setPrimitive ( primitive, sync = false ) {
		this.#primitive = primitive; /// TODO: TYPE CHECK?

		this.onChange( this.commands.setPrimitive, primitive );

		if ( sync ) {
			this.output( this.commands.setPrimitive, { primitive: this.primitive } );
		}
	}

	setColor ( color, sync = false ) {
		this.#color.forEach( ( _, i ) => this.#color[ i ] = color[ i ] || 0 );

		this.onChange( this.commands.setColor, this.color );

		if ( sync ) {
			this.output( this.commands.setColor, { color: this.color } );
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
		this.setPrimitive( state.primitive );
		this.setColor( state.color );
	}
}