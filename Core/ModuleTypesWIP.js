// import ModuleCore from "./ModuleCore.js";
// /// future work:
// const types = new Map( );

// export const ModuleTypesWIP = {
// 	register ( Module ) {
// 		const type = Module.type;

// 		if ( types.get( type ) ) {
// 			throw new Error ( `ModuleTypes.register: ${ type } is already registered` );
// 		}

// 		types.set( type, Module );
// 		console.warn( `registered ${ type }` );

// 		return Module;
// 	},

// 	get ( type ) {
// 		return types.get( type );
// 	},

// 	has ( type ) {
// 		return types.has( type );
// 	},

// 	get list ( ) {
// 		return [ ...types.keys( ) ];
// 	}
// }

// ModuleTypes.register( ModuleCore );

// // export ModuleTypesWIP;