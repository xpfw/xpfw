import { set } from "lodash"
import { FieldType, Method, RequiredType } from "../globals"
import ValidationRegistry from "../registry"
import { NumberField, NumberFieldNested, NumberObjectField } from "../testUtil/defs"
import { IField, IForm, IParameters } from "../typeDef"
import validateForm from "./form"
import validateQueryObject from "./queryObject"

const form: IForm = {
  model: "sdf",
  sections: [{fields: [NumberField, NumberFieldNested, NumberObjectField]}]
}

const untypedValidateForm: any = validateForm

const params: IParameters = {registry: ValidationRegistry, method: Method.Find}

test("Verify validateFormWithMongoQuery", async () => {
  await expect(untypedValidateForm({myNum: 432}, form)).resolves.toMatchSnapshot("Successfully Validate Number Object")
  await expect(untypedValidateForm({$inc: {myNum: 234}}, form))
  .resolves.toMatchSnapshot("dont parse update operator")

  await expect(untypedValidateForm({myNum: {$gte: 234}}, form, params))
  .resolves.toMatchSnapshot("Correctly parse sameTypeOperator")

  await expect(untypedValidateForm({myNum: {$in: [54, 123, 432, 1543, 132]}}, form, params))
  .resolves.toMatchSnapshot("Correctly parse arrayQueryOperator")

  await expect(untypedValidateForm({myNum: {$gte: "2sd34"}}, form, params))
  .rejects.toMatchSnapshot("Throw error on sameTypeOperator if types do not match")

  await expect(untypedValidateForm({myNum: {$in: [54, 123, 432, 1543, "gsfd"]}}, form, params))
  .rejects.toMatchSnapshot("Throw error on arrayQueryOperator if one of the types does not match")

  await expect(untypedValidateForm({$or: [
    {myNum: {$gte: 234}},
    {myNum: {$in: [54, 123, 432, 1543, 5432]}}
  ]}, form, params))
  .resolves.toMatchSnapshot("Correctly parse arrayedOperators")
  await expect(untypedValidateForm({
    $or: [
      {myNum: {$gte: 234}},
      {myNum: {$in: [54, 123, 432, 1543, 5432]}}
    ],
    $sort: {myNum: -1, the: 53},
    $limit: 20,
    $skip: 10
  }, form, params))
  .resolves.toMatchSnapshot("Correctly parse arrayedOperators with $sort")

  await expect(untypedValidateForm({$or: [
    {myNum: {$gte: 234}},
    {myNum: {$in: [54, 123, {}, 1543, 5432]}}
  ]}, form, params))
  .rejects.toMatchSnapshot("Correctly reject invalid arrayedOperators")

  await expect(untypedValidateForm({$or: "wuff"}, form, params))
  .rejects.toMatchSnapshot("Reject empty special qury")

  await expect(untypedValidateForm({
    $or: [
      {myNum: {$gte: 234}},
      {myNum: {$in: [54, 123, 432, 1543, 5432]}}
    ],
    $sort: {myNum: -1, the: 53, ma: "la", bu: false},
    $limit: 20,
    $skip: 10
  }, form, params))
  .rejects.toMatchSnapshot("Reject faulty $sort")

  await expect(validateQueryObject({}, form, params))
  .resolves.toMatchSnapshot("Resolve null if nothing suiting found")
})
