import { FormStore, SharedField } from "@xpfw/form-shared"
import { globals, IField } from "@xpfw/validate"
import * as React from "react"
import render from "../testUtil/render"

const BooleanField: IField = {
  mapTo: "valOfBool",
  type: globals.FieldType.Boolean,
  validate: {}
}

const booleanTest = () => {
  const n: any = null
  render(<SharedField field={BooleanField} />, "boolfield")
  FormStore.setValue(BooleanField.mapTo, true)
  render(<SharedField field={BooleanField} />, "set to true")
  FormStore.setValue(BooleanField.mapTo, false)
  render(<SharedField field={BooleanField} />, "set to false")
  FormStore.setValue(BooleanField.mapTo, "invalid")
  render(<SharedField field={BooleanField} />, "set to invalid")
}

export default booleanTest
