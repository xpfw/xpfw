import { ComponentRegistry, SharedField } from "@xpfw/form"
import { DateField, NameField, PwField, stringTest } from "@xpfw/form-tests"
import { set } from "lodash"
import * as MockDate from "mockdate"
import * as React from "react"
import render from "../testUtil/render"
import TextField, { setDate } from  "./text"
MockDate.set(new Date(2011, 4, 5, 16, 20, 42, 1337))

ComponentRegistry.registerComponent("string", TextField)
ComponentRegistry.registerComponent("number", TextField)

test("Text Field Test", () => {
  const n: any = null
  let setTo = null
  render(<SharedField schema={DateField} />, "empty datetime-local field")
  const dateSetter = setDate((a: any) => setTo = a, DateField, "value")
  expect(setTo).toBeNull()
  dateSetter({value: "2018-02-22T07:55"})
  DateField.format = "date-time"
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