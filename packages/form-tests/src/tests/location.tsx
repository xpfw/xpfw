import { FormStore, SharedField } from "@xpfw/form"
import * as React from "react"
import render from "../testUtil/render"
import { LocationField } from "../testUtil/schema"

const locationTest = () => {
  const n: any = null
  render(<SharedField schema={LocationField} />, "locationField")
  FormStore.setValue(LocationField.title, [54, 12])
  render(<SharedField schema={LocationField} />, "set to validLocation")
  FormStore.setValue(LocationField.title, [31, 3])
  render(<SharedField schema={LocationField} />, "set to otherValidLocation")
  FormStore.setValue(LocationField.title, "invalid")
  render(<SharedField schema={LocationField} />, "set to invalid")
}

export default locationTest
