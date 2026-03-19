import ModuleCore from "./ModuleCore.js"
import ScalarModule from "../ScalarModule.js"
import Vector3Module from "../Vector3Module.js"
import TransformModule from "../TransformModule.js"

const ModuleTypes = {
	[ ModuleCore.type ]: ModuleCore,
	[ ScalarModule.type ]: ScalarModule,
	[ Vector3Module.type ]: Vector3Module,
	[ TransformModule.type ]: TransformModule,
};

Object.freeze( ModuleTypes );
export default ModuleTypes;


