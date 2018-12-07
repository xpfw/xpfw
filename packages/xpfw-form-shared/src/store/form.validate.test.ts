import { TestDefs } from "@xpfw/validate"
import { matchStoreState } from "resub-persist"
import FormErrorStore from "./error"
import { FormStore as FormStoreCreator } from "./form"

const FormStore = new FormStoreCreator()

const objPath = "my.model"
const errPath = "errpath"
const myErr = {my: "error"}
const overwrittenString = "overwritten"

test("Cover Form Store", async () => {
  matchStoreState(FormErrorStore, "Initial State")
  FormStore.setValue(TestDefs.RequiredTextField.mapTo, true)
  await FormStore.validateField(TestDefs.RequiredTextField, TestDefs.FormNumberAndRequiredText)
  await FormStore.validateForm(TestDefs.FormNumberAndRequiredText)
  matchStoreState(FormErrorStore, "text is boolean err")
  FormStore.setValue(TestDefs.RequiredTextField.mapTo, 420)
  await FormStore.validateForm(TestDefs.FormNumberAndRequiredText)
  matchStoreState(FormErrorStore, "text is num err")
  FormStore.setValue(TestDefs.RequiredTextField.mapTo, "my new string")
  await FormStore.validateForm(TestDefs.FormNumberAndRequiredText)
  matchStoreState(FormErrorStore, "text is ok")
  FormStore.setValue(TestDefs.NumberField.mapTo, "my new string")
  await FormStore.validateForm(TestDefs.FormNumberAndRequiredText)
  matchStoreState(FormErrorStore, "number is string err")
  FormStore.setValue(TestDefs.NumberField.mapTo, true)
  await FormStore.validateForm(TestDefs.FormNumberAndRequiredText)
  matchStoreState(FormErrorStore, "number is boolean err")
  FormStore.setValue(TestDefs.NumberField.mapTo, 420)
  await FormStore.validateForm(TestDefs.FormNumberAndRequiredText)
  matchStoreState(FormErrorStore, "everything ok")
  expect(FormStore.getFormData(TestDefs.FormNumberAndRequiredText)).toMatchSnapshot("getFormData")
})
