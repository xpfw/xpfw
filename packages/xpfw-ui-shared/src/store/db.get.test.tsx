import { FormStore } from "@xpfw/form-shared"
import { getRandomApp } from "@xpfw/test-util"
import { FeathersClient } from "@xpfw/ui-feathers"
import { TestDefs } from "@xpfw/validate"
import "isomorphic-fetch"
import { get } from "lodash"
import { matchStoreState } from "resub-persist"
import BackendClient from "../client"
import DbStore from "./db"

BackendClient.client = FeathersClient

test("DbStore Patch Test", async () => {
  const s: any = TestDefs.FormNumberAndRequiredText.collection
  const appRef = await getRandomApp(s, false, BackendClient.client, false)

  matchStoreState(DbStore, "dbstore at start")
  expect(await DbStore.getFromServer("0", TestDefs.FormNumberAndRequiredText.collection))
    .toMatchSnapshot("nothingtoget")
  matchStoreState(DbStore, "dbstore after nothingtoget")

  expect(await DbStore.getFromServer("0", "wrongcol")).toMatchSnapshot("wrongcollection")
  matchStoreState(DbStore, "dbstore after wrongcol")

  const prefix = "createpref"
  FormStore.setValue(TestDefs.RequiredTextField.mapTo, "gettext")
  FormStore.setValue(TestDefs.NumberField.mapTo, 4654320)
  const createdObject = await DbStore.create(TestDefs.FormNumberAndRequiredText)
  expect(createdObject).toMatchSnapshot("createresult")
  matchStoreState(DbStore, "dbstore after create")

  expect(await DbStore.getFromServer(get(createdObject, "result.id"), TestDefs.FormNumberAndRequiredText.collection))
    .toMatchSnapshot("getcreated")
  matchStoreState(DbStore, "dbstore after create get")
  FormStore.setValue(TestDefs.RequiredTextField.mapTo, "get is now diff")
  FormStore.setValue(TestDefs.NumberField.mapTo, 65243)
  const patchRes = await DbStore.patch(get(createdObject, "result.id"), TestDefs.FormNumberAndRequiredText)
  expect(patchRes).not.toEqual(createdObject)
  expect(patchRes).toMatchSnapshot("patchresult")
  matchStoreState(DbStore, "dbstore after patch")

  expect(await DbStore.getFromServer(get(createdObject, "result.id"), TestDefs.FormNumberAndRequiredText.collection))
    .toMatchSnapshot("getpatched")
  matchStoreState(DbStore, "after patch")
  matchStoreState(DbStore, "dbstore after patch get")
  DbStore.get(get(createdObject, "result.id"), TestDefs.FormNumberAndRequiredText.collection)
  await appRef.cleanUp()
}, 10000)
