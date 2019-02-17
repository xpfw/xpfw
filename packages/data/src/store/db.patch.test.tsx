import { FeathersClient } from "@xpfw/data-feathers"
import { toJS } from "@xpfw/data-tests"
import { FormStore } from "@xpfw/form"
import { makeSubFields, NameField, NumberAndRequiredTextSchema, NumberField } from "@xpfw/form-tests"
import { getRandomApp } from "@xpfw/test-util"
import "isomorphic-fetch"
import { get } from "lodash-es"
import BackendClient from "../client"
import DbStore from "./db"

BackendClient.client = FeathersClient

test("DbStore Patch Test", async () => {
  const s: any = NumberAndRequiredTextSchema.collection
  const appRef = await getRandomApp(s, false, BackendClient.client, true)
  const prefix = "createpref"
  const fields = makeSubFields(NumberAndRequiredTextSchema)
  fields[NameField.title].setValue("myText")
  fields[NumberField.title].setValue(420)
  const createdObject = await DbStore.create(NumberAndRequiredTextSchema)
  expect(createdObject).toMatchSnapshot("createresult")
  fields[NameField.title].setValue("changedText")
  fields[NumberField.title].setValue(123)
  const patchRes = await DbStore.patch(get(createdObject, "id"), NumberAndRequiredTextSchema)
  expect(patchRes).not.toEqual(createdObject)
  expect(patchRes).toMatchSnapshot("patchresult")
  const getResult = await DbStore.getFromServer(get(createdObject, "id"),
    NumberAndRequiredTextSchema.collection)
  expect(getResult).toMatchSnapshot("getresult")
  expect(getResult).toEqual(patchRes)
  expect(getResult).not.toEqual(createdObject)
  NumberAndRequiredTextSchema.collection = "broken"
  const res = await DbStore.patch(get(createdObject, "id"), NumberAndRequiredTextSchema)
  expect(res).not.toBeNull()
  expect(toJS(FormStore.errors)).toMatchSnapshot("error store after broken patch")
  await appRef.cleanUp()
}, 10000)
