import { ExtendedJSONSchema, FormStore, SharedField } from "@xpfw/form"
import * as React from "react"
import render from "../testUtil/render"
import { SelectField } from "../testUtil/schema"

const select = () => {
  const n: any = null
  render(<SharedField schema={SelectField} />, "select field without value")
  FormStore.setValue(SelectField.title, "2")
  render(<SharedField schema={SelectField} />, "set to 2")
  FormStore.setValue(SelectField.title, "4")
  render(<SharedField schema={SelectField} />, "set to 4")
  FormStore.setValue(SelectField.title, "invalid")
  render(<SharedField schema={SelectField} />, "set to invalid")
  render(<SharedField schema={SelectField} />, "select field without value")
  SelectField.selectOptions = () => [
    {label: "fromFuncc", value: 4},
    {label: "fromFunca", value: 2}
  ]
  FormStore.setValue(SelectField.title, "2")
  render(<SharedField schema={SelectField} />, "from function set to 2")
  FormStore.setValue(SelectField.title, "4")
  render(<SharedField schema={SelectField} />, "from function set to 4")
  FormStore.setValue(SelectField.title, "invalid")
  render(<SharedField schema={SelectField} />, "from function set to invalid")
}

export default select
