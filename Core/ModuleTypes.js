import ModuleCore from "./ModuleCore.js"
import ScalarModule from "../ScalarModule.js"
import Vector3Module from "../Vector3Module.js"
import TransformModule from "../TransformModule.js"
import PrimitiveModule from "../PrimitiveModule.js"
import LineModule from "../LineModule.js"

const ModuleTypes = {
	[ ModuleCore.type ]: ModuleCore,
	[ ScalarModule.type ]: ScalarModule,
	[ Vector3Module.type ]: Vector3Module,
	[ TransformModule.type ]: TransformModule,
	[ PrimitiveModule.type ]: PrimitiveModule,
	[ LineModule.type ]: LineModule,
};

Object.freeze( ModuleTypes );
export default ModuleTypes;


