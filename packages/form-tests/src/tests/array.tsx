import {FormStore, SharedField} from "@xpfw/form"
import * as React from "react"
import render from "../testUtil/render"
import { ArrayField } from "../testUtil/schema"

const arrayTest = () => {
  const field = ArrayField
  render(<SharedField schema={field} />, "unchanged render")
  FormStore.setValue(field.title, [",", ",asdf ", "asdf"])
  render(<SharedField schema={field} />, "got three values")
  FormStore.setValue(field.title, [",", ",asdf ", "asdf", null])
  render(<SharedField schema={field} />, "increased size to four")
  FormStore.setValue(field.title, [",", "asdf", null])
  render(<SharedField schema={field} />, "removed second item")
}

export default arrayTest
