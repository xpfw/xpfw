import {FormStore, SharedField} from "@xpfw/form-shared"
import { FieldType, TestDefs } from "@xpfw/validate"
import { get } from "lodash"
import * as React from "react"
import render from "../testUtil/render"

const booleanTest = () => {
  const field = get(TestDefs, "TextArrayField", {
    mapTo: "myArray",
    type: FieldType.Array,
    validate: {
      type: FieldType.Text
    }
  })
  render(<SharedField field={field} />, "unchanged render")
  FormStore.setValue(field.mapTo, [",", ",asdf ", "asdf"])
  render(<SharedField field={field} />, "got three values")
  FormStore.setValue(field.mapTo, [",", ",asdf ", "asdf", null])
  render(<SharedField field={field} />, "increased size to four")
  FormStore.setValue(field.mapTo, [",", "asdf", null])
  render(<SharedField field={field} />, "removed second item")
}

export default booleanTest
