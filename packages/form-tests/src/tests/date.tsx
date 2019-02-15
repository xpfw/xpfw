import { FormStore, SharedField } from "@xpfw/form"
import * as MockDate from "mockdate"
import * as React from "react"
import render from "../testUtil/render"
import { DateField } from "../testUtil/schema"

MockDate.set(new Date(2011, 4, 5, 16, 20, 42, 1337))

const dateTest = () => {
  test("Date Field Test", () => {
    render(<SharedField schema={DateField} />, "empty datetime-local field")
    DateField.format = "date-time"
    FormStore.setValue(DateField.title, "2018-02-22T07:55")
    render(<SharedField schema={DateField} />, "datetime-local with content")
    DateField.format = "date"
    FormStore.setValue(DateField.title, "2012-01-11")
    render(<SharedField schema={DateField} />, "date with content")
    DateField.format = "time"
    FormStore.setValue(DateField.title, "16:20")
    render(<SharedField schema={DateField} />, "time with content")
  })
}

export default dateTest
