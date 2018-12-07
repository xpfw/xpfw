import { TestDefs } from "@xpfw/validate"
import { matchStoreState } from "resub-persist"
import { FormStore as FormStoreCreator } from "./form"

const FormStore = new FormStoreCreator()

const objPath = "my.model"
const errPath = "errpath"
const myErr = {my: "error"}
const overwrittenString = "overwritten"

test("Cover Form Store", () => {
  matchStoreState(FormStore, "Initial State")
  FormStore.setValue(`${objPath}.bool`, true)
  FormStore.setValue(`${objPath}.num`, 65234)
  FormStore.setValue(`${objPath}.obj`, {a: "b", c: 2, d: false})
  FormStore.setValue(`${objPath}.arr`, [23, 4, "a", false])
  matchStoreState(FormStore, "Set my model via single calls to complex object")
  FormStore.setValue(objPath, overwrittenString)
  matchStoreState(FormStore, "Overwritten my.model with string")
  expect(FormStore.getValue(objPath)).toBe(overwrittenString)
  FormStore.copyDocToFormData({
    myString: "lala",
    myNum: 5432
  }, TestDefs.FormNumberAndRequiredText)
  matchStoreState(FormStore, "Copied valid values from doc")
  FormStore.copyDocToFormData({
    myString: undefined,
    myNum: null
  }, TestDefs.FormNumberAndRequiredText)
  matchStoreState(FormStore, "Copied empty values from doc")
  FormStore.copyDocToFormData({
    myString: "gdfgfsf",
    myNum: 420
  }, TestDefs.FormNumberAndRequiredText, "Prefix")
  matchStoreState(FormStore, "Copied values from doc with a prefix")

  expect(FormStore.getFormData(TestDefs.FormNumberAndRequiredText))
    .toMatchSnapshot("no default specified")
  TestDefs.RequiredTextField.validate = {defaultValue: "string IS SET to this"}
  expect(FormStore.getFormData(TestDefs.FormNumberAndRequiredText))
    .toMatchSnapshot("default specified and set in document")
  expect(FormStore.getFormData(TestDefs.FormNumberAndRequiredText, "", "find"))
    .toMatchSnapshot("for findgetformdata dont add undefined fields")
  TestDefs.RequiredTextField.validate.convert = {create: () => "CONVERTED"}
  expect(FormStore.getFormData(TestDefs.FormNumberAndRequiredText, null, "create"))
    .toMatchSnapshot("default specified but overriden by convert")

  FormStore.setValue(TestDefs.RequiredTextField.mapTo, "MYREQUIREDNOTRESET")
  FormStore.setValue(TestDefs.NumberField.mapTo, 4201)
  matchStoreState(FormStore, "before reset")
  FormStore.resetForm(TestDefs.FormNumberAndRequiredText)
  matchStoreState(FormStore, "after reset")
})
