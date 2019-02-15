import { SharedField, useFieldWithValidation, useObject } from "@xpfw/form"
import * as React from "react"
import render from "../testUtil/render"
import { ObjectField } from "../testUtil/schema"

const objectTest = () => {
  const objField = ObjectField
  const objectTook = useObject(objField)
  const subField = useFieldWithValidation(objectTook.fields[0].schema, objectTook.fields[0].mapTo)
  render(<SharedField schema={objField} />, "locationField")
  subField.setValue(41)
  render(<SharedField schema={objField} />, "set to validLocation")
  subField.setValue(767)
  render(<SharedField schema={objField} />, "set to otherValidLocation")
  subField.setValue("invalid")
  render(<SharedField schema={objField} />, "set to invalid")
}

export default objectTest
