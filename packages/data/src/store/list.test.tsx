import { FeathersClient } from "@xpfw/data-feathers"
import { toJS } from "@xpfw/data-tests"
import { FormStore } from "@xpfw/form"
import {
  makeSubFields, NameField, NumberAndRequiredTextSchema, NumberField,
  RelationshipAndNumberSchema, RelationshipMultiField, RelationshipSingleField
 } from "@xpfw/form-tests"
import { getRandomApp } from "@xpfw/test-util"
import "isomorphic-fetch"
import { cloneDeep, get, isNil } from "lodash"
import BackendClient from "../client"
import { AuthForm, MailField, PwField } from "../components/auth"
import DbStore from "./db"
import ListStore from "./list"

BackendClient.client = FeathersClient

test("List filter Test", async () => {
  const cols: any = ["simpleTestCol", RelationshipAndNumberSchema.collection]
  const appRef = await getRandomApp(cols, false, BackendClient.client, false)
  const fields = makeSubFields(NumberAndRequiredTextSchema)
  const relFields = makeSubFields(RelationshipAndNumberSchema)
  for (let i = 0; i < 450; i++) {
    fields[NameField.title].setValue(`${i}*${i}`)
    fields[NumberField.title].setValue(i)
    const res: any = await DbStore.create(NumberAndRequiredTextSchema)
    relFields[RelationshipSingleField.title].setValue(res.id)
    relFields[NumberField.title].setValue(i * 420)
    await DbStore.create(RelationshipAndNumberSchema)
  }
  FormStore.setValue(NumberAndRequiredTextSchema.title, undefined)
  FormStore.setValue(RelationshipAndNumberSchema.title, undefined)
  expect(await ListStore.makeQuery(NumberAndRequiredTextSchema, NumberAndRequiredTextSchema.title, "page"))
    .toMatchSnapshot("result of initial search")
  expect(await ListStore.searchInPage(NumberAndRequiredTextSchema, NumberAndRequiredTextSchema.title, "page", 99999))
    .toMatchSnapshot("result of searching too far")
  expect(await ListStore.searchInPage(NumberAndRequiredTextSchema, NumberAndRequiredTextSchema.title, "page", 4))
    .toMatchSnapshot("result of searching in higher page")
  let findFields = makeSubFields(NumberAndRequiredTextSchema, NumberAndRequiredTextSchema.title, "find")
  findFields[NameField.title].setValue("4*4")
  expect(await ListStore.makeQuery(NumberAndRequiredTextSchema, NumberAndRequiredTextSchema.title, "find"))
    .toMatchSnapshot("result of search with text")
  const find2Fields = makeSubFields(NumberAndRequiredTextSchema, NumberAndRequiredTextSchema.title, "asdf")
  find2Fields[NumberField.title].setValue(240)
  expect(await ListStore.makeQuery(NumberAndRequiredTextSchema, NumberAndRequiredTextSchema.title, "asdf"))
    .toMatchSnapshot("result of search with number")

  const multiFormStore = cloneDeep(NumberAndRequiredTextSchema)
  delete multiFormStore.collection
  multiFormStore.properties[String(RelationshipSingleField.title)] = RelationshipSingleField
  multiFormStore.multiCollection = cols
FormStore.setValue(multiFormStore.title, undefined, "find")
  findFields = makeSubFields(multiFormStore, multiFormStore.title, "find")
  expect(await ListStore.makeQuery(multiFormStore, undefined, "page"))
    .toMatchSnapshot("result of initial search")
  expect(await ListStore.searchInPage(multiFormStore, undefined, "page", 999))
    .toMatchSnapshot("result of searching too far")
  expect(await ListStore.searchInPage(multiFormStore, undefined, "page", 4))
    .toMatchSnapshot("result of searching in higher page")
  findFields[NameField.title].setValue("6x6")
  expect(await ListStore.makeQuery(multiFormStore, undefined,  "find"))
    .toMatchSnapshot("result of search with text")
  findFields[multiFormStore.title].setValue(undefined)
  findFields[RelationshipSingleField.title].setValue(6)
  expect(await ListStore.makeQuery(multiFormStore, undefined, "find"))
    .toMatchSnapshot("result of search with ownedBy")
  findFields[multiFormStore.title].setValue(undefined)
  findFields[NumberField.title].setValue(420)
  expect(await ListStore.makeQuery(multiFormStore, undefined, "find"))
    .toMatchSnapshot("result of search with specifc number")
  // expect(toJS(FormStore)).toMatchSnapshot("form store after all query data filled in")
  await appRef.cleanUp()
}, 10000)
