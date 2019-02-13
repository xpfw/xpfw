import { ComponentRegistry, FormStore, SharedField } from "@xpfw/form-shared"
import { tests } from "@xpfw/form-tests"
import {  FieldType, IField } from "@xpfw/validate"
import { set } from "lodash"
import * as MockDate from "mockdate"
import * as React from "react"
import render from "../testUtil/render"
import TextField, { setDate } from  "./text"
import { setFromEvent } from "./valueUtil"
MockDate.set(new Date(2011, 4, 5, 16, 20, 42, 1337))

ComponentRegistry.registerComponent(FieldType.Text, TextField)
ComponentRegistry.registerComponent(FieldType.Number, TextField)
ComponentRegistry.registerComponent(FieldType.Date, TextField)
ComponentRegistry.registerComponent(FieldType.Password, TextField)
ComponentRegistry.registerComponent(FieldType.Slider, TextField)

test("Text Field Test", tests.text)

const DateField: IField = {
  mapTo: "dateVal",
  type: FieldType.Date,
  validate: {
    type: 2
  }
}
const PwField: IField = {
  mapTo: "pwval",
  type: FieldType.Password,
  validate: {
    type: 2
  }
}

test("Text Field Test", () => {
  const n: any = null
  let setTo = null
  render(<SharedField field={DateField} />, "empty datetime-local field")
  const dateSetter = setDate({props: {setValue: (a: any) => setTo = a, field: DateField}}, "value")
  expect(setTo).toBeNull()
  dateSetter({value: "2018-02-22T07:55"})
  expect(setTo).toMatchSnapshot("after datetime-local set")
  render(<SharedField field={DateField} />, "datetime-local with content")
  set(DateField, "validate.type", 3)
  dateSetter({value: "2012-01-11"})
  expect(setTo).toMatchSnapshot("after date set")
  render(<SharedField field={DateField} />, "date with content")
  set(DateField, "validate.type", 4)
  dateSetter({value: "16:20"})
  expect(setTo).toMatchSnapshot("after time set")
  render(<SharedField field={DateField} />, "time with content")

  let called = 0
  const setValue = () => called++
  const valueSetter = setFromEvent({props: {setValue}}, "value")
  expect(called).toBe(0)
  valueSetter(undefined)
  expect(called).toBe(1)
})
