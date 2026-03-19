import ModuleCore from "./ModuleCore.js"
import ScalarModule from "../ScalarModule.js"

const ModuleTypes = {
	ModuleCore: ModuleCore,
	ScalarModule: ScalarModule,
}

Object.freeze( ModuleTypes );
export default ModuleTypes;
