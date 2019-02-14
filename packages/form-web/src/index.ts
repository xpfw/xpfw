import { ComponentRegistry } from "@xpfw/form"
import BooleanField from "./base/boolean"
import ObjectField from "./base/object"
import ArrayField from "./base/object"
import SelectField from "./base/select"
import TextField from "./base/text"
import { setFromEvent } from "./base/valueUtil"

const registerComponents = () => {
  ComponentRegistry.registerComponent("string", TextField)
  // ComponentRegistry.registerComponent("boolean", BooleanField)
  // ComponentRegistry.registerComponent("object", ObjectField)
  // ComponentRegistry.registerComponent("array", ArrayField)
}

export {
  ComponentRegistry, TextField, registerComponents,
  setFromEvent
  // ArrayField, ObjectField, BooleanField, SelectField,
}
