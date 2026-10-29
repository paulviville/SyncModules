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
import BezierCurveModule from "../BezierCurveModule.js"
import BezierPatchModule from "../BezierPatchModule.js"
import LightModule from "../LightModule.js"
import PointLightModule from "../PointLightModule.js"
import AmbientLightModule from "../AmbientLightModule.js"
import SpotLightModule from "../SpotLightModule.js"
import DirectionalLightModule from "../DirectionalLightModule.js"

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
	[ BezierCurveModule.type ]: BezierCurveModule,
	[ BezierPatchModule.type ]: BezierPatchModule,
	// [ LightModule.type ]: LightModule, /// abstract type
	[ PointLightModule.type ]: PointLightModule,
	[ AmbientLightModule.type ]: AmbientLightModule,
	[ SpotLightModule.type ]: SpotLightModule,
	[ DirectionalLightModule.type ]: DirectionalLightModule,


	/// add new module with key: [ module.type ]: module constructor
};

Object.freeze( ModuleTypes );
export default ModuleTypes;


