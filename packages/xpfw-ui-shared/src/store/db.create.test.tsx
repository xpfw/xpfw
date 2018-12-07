import "isomorphic-fetch"
import * as MockDate from "mockdate"
MockDate.set(new Date(4, 2, 0))

import { FormStore } from "@xpfw/form-shared"
import { getRandomApp } from "@xpfw/test-util"
import { FeathersClient } from "@xpfw/ui-feathers"
import { TestDefs } from "@xpfw/validate"
import { get } from "lodash"
import { matchStoreState } from "resub-persist"
import BackendClient from "../client"
import DbStore from "./db"
import UserStore from "./user"

BackendClient.client = FeathersClient

test("DbStore Create Test", async () => {
  const s: any = TestDefs.FormNumberAndRequiredText.collection
  const appRef = await getRandomApp(s, false, BackendClient.client, true)
  const prefix = "createpref"
  FormStore.setValue(TestDefs.RequiredTextField.mapTo, "myText")
  FormStore.setValue(TestDefs.NumberField.mapTo, 420)
  matchStoreState(DbStore, "Before calling create")
  UserStore.user = {id: "myuserid"}
  const opts: any = {
    addCreatedAt: true,
    addBelongsTo: true
  }
  TestDefs.FormNumberAndRequiredText.options = opts
  const createdObject = await DbStore.create(TestDefs.FormNumberAndRequiredText)
  matchStoreState(DbStore, "After calling create")
  const col: any = TestDefs.FormNumberAndRequiredText.collection
  const getResult = await DbStore.getFromServer(get(createdObject, "result.id"),
    col)
  expect(getResult).toMatchSnapshot("getresult")
  expect(getResult).toEqual(createdObject)
  expect(getResult).toEqual(DbStore.getCreateState(TestDefs.FormNumberAndRequiredText.model))

  TestDefs.FormNumberAndRequiredText.collection = "broken"
  const res = await DbStore.create(TestDefs.FormNumberAndRequiredText)
  expect(get(res, "error")).not.toBeNull()
  await appRef.cleanUp()
}, 10000)
