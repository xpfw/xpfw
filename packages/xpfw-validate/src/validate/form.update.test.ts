import { set } from "lodash"
import { FieldType, Method, RequiredType } from "../globals"
import ValidationRegistry from "../registry"
import { NumberField, NumberFieldNested, NumberObjectField } from "../testUtil/defs"
import { IField, IForm, IParameters } from "../typeDef"
import validateFormWithMongoUpdate from "./form"

const form: IForm = {
  model: "sdf",
  sections: [{fields: [NumberField, NumberFieldNested, NumberObjectField]}]
}

const untypedValidateForm: any = validateFormWithMongoUpdate

const params: IParameters = {registry: ValidationRegistry, method: Method.Update}

test("Verify validateFormWithMongoUpdate", async () => {
  await expect(untypedValidateForm({myNum: 432}, form, params))
  .resolves.toMatchSnapshot("Successfully Validate Number Object")
  await expect(untypedValidateForm({$inc: {myNum: 234}}, form, params))
  .resolves.toMatchSnapshot("Successfully Validate Special Query Object")

  const obj = {}
  set(obj, NumberFieldNested.mapTo, 54323)
  await expect(untypedValidateForm(obj, form, params)).resolves.toMatchSnapshot("Successfully Validate Number Object")

  await expect(untypedValidateForm({$inc: {[`${NumberFieldNested.mapTo}substringstartswith`]: 345}}, form, params))
  .rejects.toMatchSnapshot("Unkonwn Key found in Special Operator")

  await expect(untypedValidateForm({$inc: {[`${NumberObjectField.mapTo}.${NumberField.mapTo}`]: 23}}, form, params))
  .resolves.toMatchSnapshot("Known Regular Object Field gets correctly Validated")

  await expect(untypedValidateForm({
    $inc: {[`${NumberObjectField.mapTo}.${NumberFieldNested.mapTo}`]: 654}
  }, form, params)).resolves.toMatchSnapshot("Known Nested Object Field gets correctly Validated")
})
