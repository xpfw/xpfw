import { ComponentRegistry } from "@xpfw/form"
import BooleanField from "./base/boolean"
import ObjectField from "./base/object"
import SelectField from "./base/select"
// import Slider from "./base/slider"
import TextField from "./base/text"
import NativeArrayField from "./base/array"

const registerComponents = (PassedComponentRegistry: any = ComponentRegistry) => {
  PassedComponentRegistry.registerComponent("string", TextField)
  PassedComponentRegistry.registerComponent("number", TextField)
  PassedComponentRegistry.registerComponent("boolean", BooleanField)
  PassedComponentRegistry.registerComponent("string", SelectField, "select")
  PassedComponentRegistry.registerComponent("object", ObjectField)
  PassedComponentRegistry.registerComponent("array", NativeArrayField)
}

export {
  ComponentRegistry, TextField, BooleanField, SelectField,
  ObjectField, NativeArrayField, registerComponents
}
