import { ExtendedJSONSchema } from "../jsonschema"
import validateQueryObject from "./validateQueryObject"

const NumberField: ExtendedJSONSchema = {
  title: "myNum",
  type: "number"
}

const DateField: ExtendedJSONSchema = {
  title: "dat",
  type: "string",
  format: "date-time"
}

const NumberFieldNested: ExtendedJSONSchema = {
  title: "my",
  type: "object",
  properties: {
    nested: {
      type: "object",
      properties: {
        number: {type: "number"}
      }
    }
  }
}

const NumberObjectField: ExtendedJSONSchema = {
  title: "myObj",
  type: "object",
  properties: {
    [String(NumberField.title)]: NumberField
  }
}

const form: ExtendedJSONSchema = {
  title: "myForm",
  properties: {
    [String(NumberField.title)]: NumberField,
    [String(NumberObjectField.title)]: NumberObjectField,
    [String(NumberFieldNested.title)]: NumberFieldNested,
    [String(DateField.title)]: DateField
  }
}

test("Verify validateFormWithMongoQuery", async () => {
  await expect(validateQueryObject({myNum: 432}, form)).resolves.toMatchSnapshot("Successfully Validate Number Object")

  await expect(validateQueryObject({myNum: {$gte: 234}}, form))
  .resolves.toMatchSnapshot("Correctly parse sameTypeOperator")

  await expect(validateQueryObject({myNum: {$in: [54, 123, 432, 1543, 132]}}, form))
  .resolves.toMatchSnapshot("Correctly parse arrayQueryOperator")

  await expect(validateQueryObject({myNum: {$gte: "2sd34"}}, form))
  .rejects.toMatchSnapshot("Throw error on sameTypeOperator if types do not match")

  await expect(validateQueryObject({myNum: {$in: [54, 123, 432, 1543, "gsfd"]}}, form))
  .rejects.toMatchSnapshot("Throw error on arrayQueryOperator if one of the types does not match")

  await expect(validateQueryObject({$or: [
    {myNum: {$gte: 234}},
    {myNum: {$in: [54, 123, 432, 1543, 5432]}}
  ]}, form))
  .resolves.toMatchSnapshot("Correctly parse arrayedOperators")
  await expect(validateQueryObject({
    $or: [
      {myNum: {$gte: 234}},
      {myNum: {$in: [54, 123, 432, 1543, 5432]}}
    ],
    $sort: {myNum: -1, the: 53},
    $limit: 20,
    $skip: 10
  }, form))
  .resolves.toMatchSnapshot("Correctly parse arrayedOperators with $sort")
  await expect(validateQueryObject({$or: [
    {myNum: {$gte: 234}},
    {myNum: {$in: [54, 123, "gsdf", 1543, 5432]}}
  ]}, form))
  .rejects.toMatchSnapshot("Correctly reject invalid arrayedOperators")
  await expect(validateQueryObject({$or: "wuff"}, form))
  .rejects.toMatchSnapshot("Reject empty special qury")

  await expect(validateQueryObject({
    $or: [
      {myNum: {$gte: 234}},
      {myNum: {$in: [54, 123, 432, 1543, 5432]}}
    ],
    $sort: {myNum: -1, the: 53, ma: "la", bu: false},
    $limit: 20,
    $skip: 10
  }, form))
  .resolves.toMatchSnapshot("$sort isn't typechecked")

  await expect(validateQueryObject({}, form))
  .resolves.toMatchSnapshot("Resolve null if nothing suiting found")
  await expect(validateQueryObject({dat: {$lte: new Date(2010, 2, 1)}}, form))
  .resolves.toMatchSnapshot("also allow date $lte ")
})
