import { FormStore, SharedField } from "@xpfw/form"
import { cloneDeep, set } from "lodash"
import * as MockDate from "mockdate"
import * as React from "react"
import render from "../testUtil/render"
import { DateField, NameField, NumberField, PwField } from "../testUtil/schema"

MockDate.set(new Date(2011, 4, 5, 16, 20, 42, 1337))

const text = () => {
  const n: any = null

  const SliderField = cloneDeep(NumberField)
  SliderField.format = "slider"

  render(<SharedField schema={NameField} />, "namefield")
  FormStore.setValue(NameField.title, "myval")
  render(<SharedField schema={NameField} />, "namefield changed va")

  render(<SharedField schema={PwField} />, "password field")

  render(<SharedField schema={NumberField} />, "as number field")
  render(<SharedField schema={SliderField} />, "as slider field")
  FormStore.setValue(NumberField.title, 5432)
  render(<SharedField schema={NumberField} />, "as number field with number")
  render(<SharedField schema={SliderField} />, "as slider field with number")
  FormStore.setValue(NumberField.title, "125")
  render(<SharedField schema={NumberField} />, "as number field with string number")
  render(<SharedField schema={SliderField} />, "as slider field with string number")
  FormStore.setValue(NumberField.title, "gfsdfasd")
  render(<SharedField schema={NumberField} />, "as number field with string")
  render(<SharedField schema={SliderField} />, "as slider field with string")
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
}

export default text
