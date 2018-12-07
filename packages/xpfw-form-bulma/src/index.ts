import { ComponentRegistry } from "@xpfw/form-shared"
import { FieldType } from "@xpfw/validate"
import BooleanField from "./base/boolean"
import holder from "./base/labelRenderer"
import SelectField from "./base/select"
import TextField from "./base/text"

const registerComponents = () => {
  ComponentRegistry.registerComponent(FieldType.Text, TextField)
  ComponentRegistry.registerComponent(FieldType.Number, TextField)
  ComponentRegistry.registerComponent(FieldType.Date, TextField)
  ComponentRegistry.registerComponent(FieldType.Password, TextField)
  ComponentRegistry.registerComponent(FieldType.Slider, TextField)
  ComponentRegistry.registerComponent(FieldType.Boolean, BooleanField)
  ComponentRegistry.registerComponent(FieldType.Select, SelectField)
}

export {
  ComponentRegistry, TextField, BooleanField, SelectField, registerComponents, holder
}
