import ModuleCore from "./ModuleCore.js"
import ScalarModule from "../ScalarModule.js"
import Vector3Module from "../Vector3Module.js"
import TransformModule from "../TransformModule.js"
import PrimitiveModule from "../PrimitiveModule.js"
import LineModule from "../LineModule.js"
import CameraModule from "../CameraModule.js"
import PointsModule from "../PointsModule.js"
import TextModule from "../TextModule.js"
import TextLogModule from "../TextLogModule.js"
import FileModule from "../FileModule.js"
import TriggerModule from "../TriggerModule.js"
import GLTFModule from "../GLTFModule.js"
import ImageModule from "../ImageModule.js"
import Image360Module from "../Image360Module.js"
import SwitchModule from "../SwitchModule.js"
import SkeletonModule from "../SkeletonModule.js"
import DisplaysModule from "../DisplaysModule.js"

const ModuleTypes = {
	[ ModuleCore.type ]: ModuleCore,
	[ ScalarModule.type ]: ScalarModule,
	[ Vector3Module.type ]: Vector3Module,
	[ TransformModule.type ]: TransformModule,
	[ PrimitiveModule.type ]: PrimitiveModule,
	[ LineModule.type ]: LineModule,
	[ CameraModule.type ]: CameraModule,
	[ PointsModule.type ]: PointsModule,
	[ TextModule.type ]: TextModule,
	[ TextLogModule.type ]: TextLogModule,
	[ FileModule.type ]: FileModule,
	[ TriggerModule.type ]: TriggerModule,
	[ GLTFModule.type ]: GLTFModule,
	[ ImageModule.type ]: ImageModule,
	[ Image360Module.type ]: Image360Module,
	[ SwitchModule.type ]: SwitchModule,
	[ SkeletonModule.type ]: SkeletonModule,
	[ DisplaysModule.type ]: DisplaysModule,
};

Object.freeze( ModuleTypes );
export default ModuleTypes;


