import { ModuleTypesWIP } from "./Core/ModuleTypesWIP.js";
import LightModule from "./LightModule.js";

export default class AmbientLightModule extends LightModule {
	static type = "AmbientLightModule";
	static commands = {
		...super.commands,
	}

	constructor ( UUID ) {
		super( UUID );
	}
}

ModuleTypesWIP.register( AmbientLightModule );