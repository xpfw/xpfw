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

test("DbStore Remove Test", async () => {
  const s: any = TestDefs.FormNumberAndRequiredText.collection
  const appRef = await getRandomApp(s, false, BackendClient.client, true)
  matchStoreState(DbStore, "before anything")

  FormStore.setValue(TestDefs.RequiredTextField.mapTo, "myText")
  FormStore.setValue(TestDefs.NumberField.mapTo, 420)
  const createdObject = await DbStore.create(TestDefs.FormNumberAndRequiredText)
  expect(createdObject).toMatchSnapshot("createresult")
  FormStore.setValue(TestDefs.RequiredTextField.mapTo, "changedText")
  FormStore.setValue(TestDefs.NumberField.mapTo, 123)
  const removeRes = await DbStore.remove(get(createdObject, "result.id"), TestDefs.FormNumberAndRequiredText.collection)
  expect(removeRes).toEqual(createdObject)
  expect(removeRes).toMatchSnapshot("removeresult")
  matchStoreState(DbStore, "After calling remove")
  const getResult = await DbStore.getFromServer(get(createdObject, "result.id"),
    TestDefs.FormNumberAndRequiredText.collection)
  expect(get(getResult, "error")).not.toBeNull()
  expect(getResult).not.toEqual(removeRes)
  expect(getResult).not.toEqual(createdObject)
  expect(removeRes).toEqual(DbStore.getRemoveState(get(createdObject, "result.id")))

  TestDefs.FormNumberAndRequiredText.collection = "broken"
  const res = await DbStore.remove(get(createdObject, "result.id"), TestDefs.FormNumberAndRequiredText.collection)
  expect(get(res, "error")).not.toBeNull()
  await appRef.cleanUp()
}, 10000)
