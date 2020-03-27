import "isomorphic-fetch"
import * as MockDate from "mockdate"
MockDate.set(new Date(4, 2, 0))

import { FeathersClient } from "@xpfw/data-feathers"
import { toJS } from "@xpfw/data-tests"
import { addTimeStamp } from "@xpfw/form"
import { makeSubFields, NameField, NumberAndRequiredTextSchema, NumberField } from "@xpfw/form-tests"
import { getRandomApp } from "@xpfw/test-util"
import { get } from "lodash"
import BackendClient from "../client"
import { addUserId } from "../util/modifiers"
import DbStore from "./db"
import UserStore from "./user"

BackendClient.client = FeathersClient

test("DbStore Create Test", async () => {
  const s: any = NumberAndRequiredTextSchema.collection
  const appRef = await getRandomApp(s, false, BackendClient.client, true)
  const prefix = "createpref"
  const fields = makeSubFields(NumberAndRequiredTextSchema)
  fields[NameField.title].setValue("myText")
  fields[NumberField.title].setValue(420)
  expect(toJS(DbStore)).toMatchSnapshot("Before calling create")
  UserStore.user = {id: "myuserid"}
  const opts: any = {
    addCreatedAt: true,
    addBelongsTo: true
  }
  NumberAndRequiredTextSchema.modify = [addTimeStamp("createdAt"), addUserId("belongsTo")]
  const createdObject = await DbStore.create(NumberAndRequiredTextSchema)
  expect(toJS(DbStore)).toMatchSnapshot("After calling create")
  const col: any = NumberAndRequiredTextSchema.collection
  const getResult = await DbStore.getFromServer(get(createdObject, "id"), col)
  expect(toJS(getResult)).toMatchSnapshot("getresult")
  expect(getResult).toEqual(createdObject)
  expect(getResult).toEqual(DbStore.getCreateState(NumberAndRequiredTextSchema.title))

  NumberAndRequiredTextSchema.collection = "broken"
  const res = await DbStore.create(NumberAndRequiredTextSchema)
  expect(res).not.toBeNull()
  await appRef.cleanUp()
}, 10000)
