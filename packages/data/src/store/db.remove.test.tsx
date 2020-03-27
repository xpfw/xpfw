import { FeathersClient } from "@xpfw/data-feathers"
import { toJS } from "@xpfw/data-tests"
import { FormStore } from "@xpfw/form"
import { makeSubFields, NameField, NumberAndRequiredTextSchema, NumberField } from "@xpfw/form-tests"
import { getRandomApp } from "@xpfw/test-util"
import "isomorphic-fetch"
import { get } from "lodash"
import BackendClient from "../client"
import DbStore from "./db"

BackendClient.client = FeathersClient

test("DbStore Remove Test", async () => {
  const s: any = NumberAndRequiredTextSchema.collection
  const appRef = await getRandomApp(s, false, BackendClient.client, true)
  expect(toJS(DbStore)).toMatchSnapshot("before anything")

  const fields = makeSubFields(NumberAndRequiredTextSchema)
  fields[NameField.title].setValue("myText")
  fields[NumberField.title].setValue(420)
  const createdObject = await DbStore.create(NumberAndRequiredTextSchema)
  expect(createdObject).toMatchSnapshot("createresult")
  const removeRes = await DbStore.remove(get(createdObject, "id"), NumberAndRequiredTextSchema.collection)
  expect(removeRes).toEqual(createdObject)
  expect(removeRes).toMatchSnapshot("removeresult")
  expect(toJS(DbStore)).toMatchSnapshot("After calling remove")
  const getResult = await DbStore.getFromServer(get(createdObject, "id"),
    NumberAndRequiredTextSchema.collection)
  expect(getResult).not.toBeNull()
  expect(getResult).not.toEqual(removeRes)
  expect(getResult).not.toEqual(createdObject)
  expect(removeRes).toEqual(DbStore.getRemoveState(get(createdObject, "id")))

  NumberAndRequiredTextSchema.collection = "broken"
  const res = await DbStore.remove(get(createdObject, "id"), NumberAndRequiredTextSchema.collection)
  expect(res).not.toBeNull()
  await appRef.cleanUp()
}, 10000)
