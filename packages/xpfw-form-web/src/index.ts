import { ComponentRegistry } from "@xpfw/form-shared"
import { FieldType } from "@xpfw/validate"
import BooleanField from "./base/boolean"
import ObjectField from "./base/object"
import SelectField from "./base/select"
import TextField from "./base/text"
import { setFromEvent } from "./base/valueUtil"

const registerComponents = () => {
  ComponentRegistry.registerComponent(FieldType.Text, TextField)
  ComponentRegistry.registerComponent(FieldType.Number, TextField)
  ComponentRegistry.registerComponent(FieldType.Date, TextField)
  ComponentRegistry.registerComponent(FieldType.Password, TextField)
  ComponentRegistry.registerComponent(FieldType.Slider, TextField)
  ComponentRegistry.registerComponent(FieldType.Boolean, BooleanField)
  ComponentRegistry.registerComponent(FieldType.Select, SelectField)
  ComponentRegistry.registerComponent(FieldType.Object, ObjectField)
}

export {
  ComponentRegistry, TextField, BooleanField, SelectField, registerComponents,
  setFromEvent
}
