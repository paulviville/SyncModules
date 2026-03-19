import ModuleCore from "./ModuleCore.js"
import ScalarModule from "../ScalarModule.js"
import Vector3Module from "../Vector3Module.js"

const ModuleTypes = {
	ModuleCore: ModuleCore,
	ScalarModule: ScalarModule,
	Vector3Module: Vector3Module,
}

Object.freeze( ModuleTypes );
export default ModuleTypes;
