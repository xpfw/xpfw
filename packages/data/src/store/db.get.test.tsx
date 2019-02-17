import { FeathersClient } from "@xpfw/data-feathers"
import { toJS } from "@xpfw/data-tests"
import { FormStore } from "@xpfw/form"
import { makeSubFields, NameField, NumberAndRequiredTextSchema, NumberField } from "@xpfw/form-tests"
import { getRandomApp } from "@xpfw/test-util"
import "isomorphic-fetch"
import { get } from "lodash-es"
import BackendClient from "../client"
import dataOptions from "../options"
import DbStore from "./db"

dataOptions.idPath = "id"
BackendClient.client = FeathersClient

test("DbStore Patch Test", async () => {
  const s: any = NumberAndRequiredTextSchema.collection
  const appRef = await getRandomApp(s, false, BackendClient.client, false)

  expect(toJS(DbStore)).toMatchSnapshot("dbstore at start")
  expect(await DbStore.getFromServer("0", NumberAndRequiredTextSchema.collection))
    .toMatchSnapshot("nothingtoget")
  expect(toJS(DbStore)).toMatchSnapshot("dbstore after nothingtoget")

  expect(await DbStore.getFromServer("0", "wrongcol")).toMatchSnapshot("wrongcollection")
  expect(toJS(DbStore)).toMatchSnapshot("dbstore after wrongcol")
  expect(toJS(FormStore.errors)).toMatchSnapshot("errorstore after wrongcol")

  const prefix = "createpref"
  const fields = makeSubFields(NumberAndRequiredTextSchema)
  fields[NameField.title].setValue("gettext")
  fields[NumberField.title].setValue(4654320)
  const createdObject = await DbStore.create(NumberAndRequiredTextSchema)
  expect(createdObject).toMatchSnapshot("createresult")
  expect(toJS(DbStore)).toMatchSnapshot("dbstore after create")

  expect(await DbStore.getFromServer(get(createdObject, "id"), NumberAndRequiredTextSchema.collection))
    .toMatchSnapshot("getcreated")
  expect(toJS(DbStore)).toMatchSnapshot("dbstore after create get")
  fields[NameField.title].setValue("get is now diff")
  fields[NumberField.title].setValue(65243)
  const patchRes = await DbStore.patch(get(createdObject, "id"), NumberAndRequiredTextSchema)
  expect(patchRes).not.toEqual(createdObject)
  expect(patchRes).toMatchSnapshot("patchresult")
  expect(toJS(DbStore)).toMatchSnapshot("dbstore after patch")

  expect(toJS(await DbStore.getFromServer(get(createdObject, "id"), NumberAndRequiredTextSchema.collection)))
    .toMatchSnapshot("getpatched")
  expect(toJS(DbStore)).toMatchSnapshot("after patch")
  expect(toJS(DbStore)).toMatchSnapshot("dbstore after patch get")
  DbStore.get(get(createdObject, "id"), NumberAndRequiredTextSchema.collection)
  await appRef.cleanUp()
}, 10000)
