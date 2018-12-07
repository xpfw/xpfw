import { ComponentRegistry } from "@xpfw/form-shared"
import { FieldType } from "@xpfw/validate"
import BooleanField from "./base/boolean"
import DateField from "./base/date"
import ObjectField from "./base/object"
import SelectField from "./base/select"
import Slider from "./base/slider"
import TextField from "./base/text"

const registerComponents = (PassedComponentRegistry: any = ComponentRegistry) => {
  PassedComponentRegistry.registerComponent(FieldType.Text, TextField)
  PassedComponentRegistry.registerComponent(FieldType.Number, TextField)
  PassedComponentRegistry.registerComponent(FieldType.Date, DateField)
  PassedComponentRegistry.registerComponent(FieldType.Password, TextField)
  PassedComponentRegistry.registerComponent(FieldType.Slider, Slider)
  PassedComponentRegistry.registerComponent(FieldType.Boolean, BooleanField)
  PassedComponentRegistry.registerComponent(FieldType.Select, SelectField)
  PassedComponentRegistry.registerComponent(FieldType.Object, ObjectField)
}

export {
  ComponentRegistry, TextField, BooleanField, SelectField,
  DateField, Slider, registerComponents
}
