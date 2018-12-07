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
  const appRef = await getRandomApp(s, false, BackendClient.client, true)
  const prefix = "createpref"
  FormStore.setValue(TestDefs.RequiredTextField.mapTo, "myText")
  FormStore.setValue(TestDefs.NumberField.mapTo, 420)
  const createdObject = await DbStore.create(TestDefs.FormNumberAndRequiredText)
  expect(createdObject).toMatchSnapshot("createresult")
  FormStore.setValue(TestDefs.RequiredTextField.mapTo, "changedText")
  FormStore.setValue(TestDefs.NumberField.mapTo, 123)
  const patchRes = await DbStore.patch(get(createdObject, "result.id"), TestDefs.FormNumberAndRequiredText)
  expect(patchRes).not.toEqual(createdObject)
  expect(patchRes).toMatchSnapshot("patchresult")
  const getResult = await DbStore.getFromServer(get(createdObject, "result.id"),
    TestDefs.FormNumberAndRequiredText.collection)
  expect(getResult).toMatchSnapshot("getresult")
  expect(getResult).toEqual(patchRes)
  expect(getResult).not.toEqual(createdObject)
  TestDefs.FormNumberAndRequiredText.collection = "broken"
  const res = await DbStore.patch(get(createdObject, "result.id"), TestDefs.FormNumberAndRequiredText)
  expect(get(res, "error")).not.toBeNull()
  await appRef.cleanUp()
}, 10000)
