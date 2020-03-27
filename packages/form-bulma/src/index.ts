import { ComponentRegistry } from "@xpfw/form"
import BooleanField from "./base/boolean"
import holder from "./base/labelRenderer"
import SelectField from "./base/select"
import TextField from "./base/text"

const registerComponents = () => {
  ComponentRegistry.registerComponent("string", TextField)
  ComponentRegistry.registerComponent("number", TextField)
  ComponentRegistry.registerComponent("date", TextField)
  ComponentRegistry.registerComponent("boolean", BooleanField)
  ComponentRegistry.registerComponent("string", SelectField, "select")
}

export {
  ComponentRegistry, TextField, BooleanField, SelectField, registerComponents, holder
}
