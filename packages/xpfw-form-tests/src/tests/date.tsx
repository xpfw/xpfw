import { ComponentRegistry, FormStore, SharedField } from "@xpfw/form-shared"
import { tests } from "@xpfw/form-tests"
import {  FieldType, IField } from "@xpfw/validate"
import { set } from "lodash"
import * as MockDate from "mockdate"
import * as React from "react"
import render from "../testUtil/render"
MockDate.set(new Date(2011, 4, 5, 16, 20, 42, 1337))

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
const dateTest = () => {
  test("Date Field Test", () => {
    render(<SharedField field={DateField} />, "empty datetime-local field")
    FormStore.setValue(DateField.mapTo, "2018-02-22T07:55")
    render(<SharedField field={DateField} />, "datetime-local with content")
    set(DateField, "validate.type", 3)
    FormStore.setValue(DateField.mapTo, "2012-01-11")
    render(<SharedField field={DateField} />, "date with content")
    set(DateField, "validate.type", 4)
    FormStore.setValue(DateField.mapTo, "16:20")
    render(<SharedField field={DateField} />, "time with content")
  })
}

export default dateTest
