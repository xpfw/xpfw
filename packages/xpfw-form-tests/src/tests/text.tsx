import { ComponentRegistry, FormStore, SharedField } from "@xpfw/form-shared"
import { globals, IField, TestDefs } from "@xpfw/validate"
import { cloneDeep, set } from "lodash"
import * as MockDate from "mockdate"
import * as React from "react"
import render from "../testUtil/render"

MockDate.set(new Date(2011, 4, 5, 16, 20, 42, 1337))

const DateField: IField = {
  mapTo: "dateVal",
  type: globals.FieldType.Date,
  validate: {
    type: 2
  }
}
const PwField: IField = {
  mapTo: "pwval",
  type: globals.FieldType.Password,
  validate: {
    type: 2
  }
}

const text = () => {
  const n: any = null

  const SliderField = cloneDeep(TestDefs.NumberField)
  SliderField.type = globals.FieldType.Slider

  render(<SharedField field={n} />, "empty render")
  render(<SharedField field={TestDefs.NameFieldPublic} />, "namefield")
  FormStore.setValue(TestDefs.NameFieldPublic.mapTo, "myval")
  render(<SharedField field={TestDefs.NameFieldPublic} />, "namefield changed va")

  render(<SharedField field={PwField} />, "password field")

  render(<SharedField field={TestDefs.NumberField} />, "as number field")
  render(<SharedField field={SliderField} />, "as slider field")
  FormStore.setValue(TestDefs.NumberField.mapTo, 5432)
  render(<SharedField field={TestDefs.NumberField} />, "as number field with number")
  render(<SharedField field={SliderField} />, "as slider field with number")
  FormStore.setValue(TestDefs.NumberField.mapTo, "125")
  render(<SharedField field={TestDefs.NumberField} />, "as number field with string number")
  render(<SharedField field={SliderField} />, "as slider field with string number")
  FormStore.setValue(TestDefs.NumberField.mapTo, "gfsdfasd")
  render(<SharedField field={TestDefs.NumberField} />, "as number field with string")
  render(<SharedField field={SliderField} />, "as slider field with string")
  render(<SharedField field={DateField} />, "empty datetime-local field")

  FormStore.setValue(DateField.mapTo, "2018-02-22T07:55")
  render(<SharedField field={DateField} />, "datetime-local with content")
  FormStore.setValue(DateField.mapTo, "2012-01-11")
  render(<SharedField field={DateField} />, "date with content")
  FormStore.setValue(DateField.mapTo, "16:20")
  render(<SharedField field={DateField} />, "time with content")
}

export default text
