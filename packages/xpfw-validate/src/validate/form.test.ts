import { FieldType, Method, RequiredType } from "../globals"
import ValidationRegistry from "../registry"
import { FormNumberAndRequiredText } from "../testUtil/defs"
import { IField, IForm } from "../typeDef"
import validateForm from "./form"

const form: IForm = FormNumberAndRequiredText

const untypedValidateForm: any = validateForm

test("Verify validateForm", async () => {
  await expect(untypedValidateForm(null, null, null)).resolves.toMatchSnapshot("called without any args")
  await expect(validateForm({}, form, {registry: ValidationRegistry}))
  .rejects.toMatchSnapshot("Error validating empty object")

  await expect(validateForm({myString: 543, myNum: "lulu"},
  form, {registry: ValidationRegistry}))
  .rejects.toMatchSnapshot("Error validating invalid object")

  await expect(validateForm({
    myString: "gfsd", myNum: 5, removed: "in", snap: "shot", and: "result"
  }, form, {registry: ValidationRegistry}))
  .resolves.toMatchSnapshot("Validated Object successfully and stripped unknown keys")

  await expect(validateForm({
    removed: "in", snap: "shot", and: "result"
  }, form, {registry: ValidationRegistry, method: Method.Update}))
  .rejects.toMatchSnapshot("Validated Object successfully and stripped empty but because update is error")
})
