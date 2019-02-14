import { FormStore, SharedField } from "@xpfw/form-shared"
import { globals, IField, TestDefs } from "@xpfw/validate"
import * as React from "react"
import render from "../testUtil/render"

const NumberObjectField: IField = {
  mapTo: "m",
  type: globals.FieldType.Location,
  validate: {}
}

const locationTest = () => {
  const n: any = null
  const objField = TestDefs.NumberObjectField
  const objChildField = TestDefs.NumberField
  render(<SharedField field={objField} />, "locationField")
  FormStore.setValue(`${objField.mapTo}.${objChildField.mapTo}`, 41)
  render(<SharedField field={objField} />, "set to validLocation")
  FormStore.setValue(`${objField.mapTo}.${objChildField.mapTo}`, 767)
  render(<SharedField field={objField} />, "set to otherValidLocation")
  FormStore.setValue(`${objField.mapTo}.${objChildField.mapTo}`, "invalid")
  render(<SharedField field={objField} />, "set to invalid")
}

export default locationTest
