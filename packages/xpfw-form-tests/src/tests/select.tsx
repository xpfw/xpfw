import { FormStore, SharedField } from "@xpfw/form-shared"
import { globals, IField, IFieldSelect } from "@xpfw/validate"
import * as React from "react"
import render from "../testUtil/render"
import "./select"

const SelectField: IFieldSelect = {
  mapTo: "selectMeVal",
  type: globals.FieldType.Select,
  selectOptions: [
    {label: "c", value: 4},
    {label: "a", value: 2}
  ],
  validate: {}
}

const select = () => {
  const n: any = null
  render(<SharedField field={SelectField} />, "select field without value")
  FormStore.setValue(SelectField.mapTo, "2")
  render(<SharedField field={SelectField} />, "set to 2")
  FormStore.setValue(SelectField.mapTo, "4")
  render(<SharedField field={SelectField} />, "set to 4")
  FormStore.setValue(SelectField.mapTo, "invalid")
  render(<SharedField field={SelectField} />, "set to invalid")
  render(<SharedField field={SelectField} />, "select field without value")
  SelectField.selectOptions = () => [
    {label: "fromFuncc", value: 4},
    {label: "fromFunca", value: 2}
  ]
  FormStore.setValue(SelectField.mapTo, "2")
  render(<SharedField field={SelectField} />, "from function set to 2")
  FormStore.setValue(SelectField.mapTo, "4")
  render(<SharedField field={SelectField} />, "from function set to 4")
  FormStore.setValue(SelectField.mapTo, "invalid")
  render(<SharedField field={SelectField} />, "from function set to invalid")
}

export default select
