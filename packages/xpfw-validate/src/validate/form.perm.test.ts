import { set } from "lodash"
import { FieldType, Method, Permission, RequiredType } from "../globals"
import ValidationRegistry from "../registry"
import {
  BooleanFieldWithMultiPermissions, FormWithPermissionsOnFields,
  NameFieldPublic, ObjectWithDifferingPermsPerKey
} from "../testUtil/defs"
import { IField, IForm, IParameters } from "../typeDef"
import validateForm from "./form"
import validateQueryObject from "./queryObject"

const form: IForm = FormWithPermissionsOnFields

const untypedValidateForm: any = validateForm

const params: IParameters = {registry: ValidationRegistry, method: Method.Find}

test("Verify validateForm respects Permission Settings", async () => {
  await expect(
    untypedValidateForm({guestName: "asdf", permbool: true}, form, {
      method: Method.Create
    })
  ).resolves.toMatchSnapshot("Strip permbool because not permitted")
  await expect(
    untypedValidateForm({guestName: "asdf", permbool: true}, form, {
      registry: ValidationRegistry,
      currentUser: {_id: Permission.Admin},
      method: Method.Create
    })
  ).resolves.toMatchSnapshot("Don't strip permbool because admin is permitted")
  await expect(
    untypedValidateForm({guestName: "asdf", permbool: true}, form, {
      registry: ValidationRegistry,
      currentUser: {_id: Permission.User},
      method: Method.Update
    })
  ).resolves.toMatchSnapshot("strip permbool because for update only server is permitted")
})
