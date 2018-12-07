import { set } from "lodash"
import { FieldType, Method, Permission, RequiredType } from "../globals"
import ValidationRegistry from "../registry"
import { NumberField, NumberFieldNested, NumberObjectField } from "../testUtil/defs"
import { IField, IForm, IParameters } from "../typeDef"
import validateForm from "./form"
import validateQueryObject from "./queryObject"

const form: IForm = {
  model: "sdf",
  sections: [{fields: [{
    type: FieldType.Text,
    mapTo: "ownedBy"
  }, NumberField, NumberFieldNested, NumberObjectField]}],
  permissions: {
    required: {
      create: Permission.User,
      find: Permission.User,
      get: Permission.Owner,
      update: Permission.Owner,
      remove: Permission.Owner
    },
    requireOwner: "ownedBy"
  }
}

const untypedValidateForm: any = validateForm

const params: IParameters = {registry: ValidationRegistry, method: Method.Find, currentUser: {_id: "MYID"}, idPath: "_id"}

test("Verify validateFormWithMongoQuery", async () => {
  await expect(untypedValidateForm({myNum: 432}, form, params))
  .resolves.toMatchSnapshot("Owned By got added in regular find")
  await expect(untypedValidateForm({$limit: 10, $skip: 1, $sort: {}}, form, params))
  .resolves.toMatchSnapshot("Owned By got added in regular find")
  await expect(untypedValidateForm({$or: [
    {myNum: 20}, {myNum: 30}
  ]}, form, params))
  .resolves.toMatchSnapshot("Owned By got added in $or find")
  await expect(untypedValidateForm({$and: [
    {myNum: 20}, {myNum: 30}
  ]}, form, params))
  .resolves.toMatchSnapshot("Owned By got added in $and find")
  params.method = Method.Create
  await expect(untypedValidateForm({myNum: 756}, form, params))
  .resolves.toMatchSnapshot("Owned By got added in regular create")
  params.method = Method.Update
  await expect(untypedValidateForm({myNum: 222}, form, params))
  .resolves.toMatchSnapshot("Owned By got added in regular update")
  params.method = Method.Patch
  await expect(untypedValidateForm({myNum: 1666}, form, params))
  .resolves.toMatchSnapshot("Owned By got added in regular patch")

  form.permissions.requireOwner = {
    find: "ownedBy",
    update: "ownedBy"
  }
  await expect(untypedValidateForm({myNum: 756}, form, params))
  .resolves.toMatchSnapshot("Owned By not added because not wanted created")
  params.method = Method.Update
  await expect(untypedValidateForm({myNum: 222}, form, params))
  .resolves.toMatchSnapshot("Owned By got added in specific update")
  params.method = Method.Patch
  await expect(untypedValidateForm({myNum: 1666}, form, params))
  .resolves.toMatchSnapshot("Owned By not added because not wanted patch")
  params.method = Method.Find
  await expect(untypedValidateForm({myNum: 222}, form, params))
  .resolves.toMatchSnapshot("Owned By got added in specific find")
})
