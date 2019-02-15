import { FormStore } from "@xpfw/form-shared"
import { getRandomApp } from "@xpfw/test-util"
import { FeathersClient } from "@xpfw/ui-feathers"
import { TestDefs, ValidationRegistry } from "@xpfw/validate"
import "isomorphic-fetch"
import { cloneDeep, get, isNil } from "lodash"
import { matchStoreState } from "resub-persist"
import BackendClient from "../client"
import { AuthForm, MailField, PwField } from "../components/auth"
import DbStore from "./db"
import ListStore from "./list"

BackendClient.client = FeathersClient

ValidationRegistry.registerForm(AuthForm)

test("List filter Test", async () => {
  const cols: any = ["simpleTestCol", TestDefs.FormRelationshipToNumAndRequiredText.collection]
  const appRef = await getRandomApp(cols, false, BackendClient.client, false)
  for (let i = 0; i < 450; i++) {
    FormStore.setValue(TestDefs.RequiredTextField.mapTo, `${i}*${i}`)
    FormStore.setValue(TestDefs.NumberField.mapTo, i)
    const res: any = await DbStore.create(TestDefs.FormNumberAndRequiredText)
    FormStore.setValue(TestDefs.RelationshipSingleField.mapTo, res.result.id)
    FormStore.setValue(TestDefs.NumberField.mapTo, i * 420)
    await DbStore.create(TestDefs.FormRelationshipToNumAndRequiredText)
  }
  expect(FormStore.getFormData(TestDefs.FormNumberAndRequiredText, "page")).toMatchSnapshot("getformdat")
  expect(await ListStore.makeQuery(TestDefs.FormNumberAndRequiredText, "page"))
    .toMatchSnapshot("result of initial search")
  expect(await ListStore.searchInPage(TestDefs.FormNumberAndRequiredText, "page", 99999))
    .toMatchSnapshot("result of searching too far")
  expect(await ListStore.searchInPage(TestDefs.FormNumberAndRequiredText, "page", 4))
    .toMatchSnapshot("result of searching in higher page")
  FormStore.setValue("find." + TestDefs.RequiredTextField.mapTo, "4*4")
  expect(await ListStore.makeQuery(TestDefs.FormNumberAndRequiredText, "find"))
    .toMatchSnapshot("result of search with text")
  FormStore.setValue("asdf." + TestDefs.RequiredTextField.mapTo, undefined)
  FormStore.setValue("asdf." + TestDefs.NumberField.mapTo, 240)
  expect(await ListStore.makeQuery(TestDefs.FormNumberAndRequiredText, "asdf"))
    .toMatchSnapshot("result of search with number")

  const multiFormStore = cloneDeep(TestDefs.FormNumberAndRequiredText)
  delete multiFormStore.collection
  multiFormStore.sections[0].fields.push(TestDefs.RelationshipSingleField)
  multiFormStore.multiCollection = cols
  FormStore.setValue(TestDefs.RequiredTextField.mapTo, undefined)
  FormStore.setValue(TestDefs.NumberField.mapTo, undefined)
  expect(await ListStore.makeQuery(multiFormStore, "page"))
    .toMatchSnapshot("result of initial search")
  expect(await ListStore.searchInPage(multiFormStore, "page", 999))
    .toMatchSnapshot("result of searching too far")
  expect(await ListStore.searchInPage(multiFormStore, "page", 4))
    .toMatchSnapshot("result of searching in higher page")
  FormStore.setValue("find." + TestDefs.RequiredTextField.mapTo, "6x6")
  expect(await ListStore.makeQuery(multiFormStore, "find"))
    .toMatchSnapshot("result of search with text")
  FormStore.setValue("find." + TestDefs.RequiredTextField.mapTo, undefined)
  FormStore.setValue("find." + TestDefs.RelationshipSingleField.mapTo, 6)
  expect(await ListStore.makeQuery(multiFormStore, "find"))
    .toMatchSnapshot("result of search with ownedBy")
  FormStore.setValue("find." + TestDefs.RelationshipSingleField.mapTo, undefined)
  FormStore.setValue("find." + TestDefs.NumberField.mapTo, 420)
  expect(await ListStore.makeQuery(multiFormStore, "find"))
    .toMatchSnapshot("result of search with specifc number")
  await appRef.cleanUp()
}, 10000)
