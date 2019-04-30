import { ComponentRegistry, FormStore, SharedField } from "@xpfw/form"
import { DateField } from "@xpfw/form-tests"
import * as MockDate from "mockdate"
import * as React from "react"
import render from "../testUtil/render"
import TextField, { setDate } from  "./text"
MockDate.set(new Date(1304605243337))

ComponentRegistry.registerComponent("string", TextField)
ComponentRegistry.registerComponent("number", TextField)

test("Text Field Test", () => {
  const n: any = null
  let setTo = null
  render(<SharedField schema={DateField} />, "empty datetime-local field")
  const dateSetter = setDate((a: any) => {
    setTo = a
    FormStore.setValue(String(DateField.title), a)
  }, DateField, "value")
  expect(setTo).toBeNull()
  DateField.format = "date-time"
  dateSetter({value: "2018-02-22T07:55"})
  expect(setTo).toMatchSnapshot("after datetime-local set")
  render(<SharedField schema={DateField} />, "datetime-local with content")
  DateField.format = "date"
  dateSetter({value: "2012-01-11"})
  expect(setTo).toMatchSnapshot("after date set")
  render(<SharedField schema={DateField} />, "date with content")
  DateField.format = "time"
  dateSetter({value: "16:20"})
  expect(setTo).toMatchSnapshot("after time set")
  render(<SharedField schema={DateField} />, "time with content")
})
