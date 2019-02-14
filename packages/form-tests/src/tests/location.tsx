import { FormStore, SharedField } from "@xpfw/form-shared"
import { globals, IField } from "@xpfw/validate"
import * as React from "react"
import render from "../testUtil/render"

const LocationField: IField = {
  mapTo: "valOfBool",
  type: globals.FieldType.Location,
  validate: {}
}

const locationTest = () => {
  const n: any = null
  render(<SharedField field={LocationField} />, "locationField")
  FormStore.setValue(LocationField.mapTo, [54, 12])
  render(<SharedField field={LocationField} />, "set to validLocation")
  FormStore.setValue(LocationField.mapTo, [31, 3])
  render(<SharedField field={LocationField} />, "set to otherValidLocation")
  FormStore.setValue(LocationField.mapTo, "invalid")
  render(<SharedField field={LocationField} />, "set to invalid")
}

export default locationTest
