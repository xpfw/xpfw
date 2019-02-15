import { FormStore, JSONSchemaDefinition, SharedField } from "@xpfw/form"
import * as React from "react"
import render from "../testUtil/render"
import { BooleanField } from "../testUtil/schema"

const booleanTest = () => {
  const n: any = null
  render(<SharedField mapTo={BooleanField.title} schema={BooleanField} />, "boolfield")
  FormStore.setValue(BooleanField.title, true)
  render(<SharedField mapTo={BooleanField.title} schema={BooleanField} />, "set to true")
  FormStore.setValue(BooleanField.title, false)
  render(<SharedField mapTo={BooleanField.title} schema={BooleanField} />, "set to false")
  FormStore.setValue(BooleanField.title, "invalid")
  render(<SharedField mapTo={BooleanField.title} schema={BooleanField} />, "set to invalid")
}

export default booleanTest
