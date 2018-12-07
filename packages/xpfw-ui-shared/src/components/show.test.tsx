import { FormStore } from "@xpfw/form-shared"
import { getRandomApp } from "@xpfw/test-util"
import { FeathersClient } from "@xpfw/ui-feathers"
import { TestDefs } from "@xpfw/validate"
import "isomorphic-fetch"
import { get } from "lodash"
import * as render from "preact-render-to-json"
import * as React from "react"
import { matchStoreState } from "resub-persist"
import BackendClient from "../client"
import DbStore from "../store/db"
import makeMockElement from "../testUtil/makeMockElement"
import { submitCreate } from "./create"
import SharedFormShow from "./show"

BackendClient.client = FeathersClient

test("DbStore Show Test", async () => {
  const form = TestDefs.FormNumberAndRequiredText
  const s: any = form.collection
  const appRef = await getRandomApp(s, false, BackendClient.client, true)
  const MockEle: any = makeMockElement("show")
  const MockedShow = SharedFormShow(MockEle)
  FormStore.setValue(TestDefs.RequiredTextField.mapTo, "myText")
  FormStore.setValue(TestDefs.NumberField.mapTo, 420)
  expect(render(<MockedShow collection={form.collection} />)).toMatchSnapshot("before anything")
  const createRes = await submitCreate({props: {form}})()
  expect(render(<MockedShow collection={form.collection} id={createRes.result.id} />)).toMatchSnapshot("after create")
  await DbStore.get(createRes.result.id, form.collection, true)
  expect(render(<MockedShow collection={form.collection} id={createRes.result.id} />)).toMatchSnapshot("after fetch")
  expect(await DbStore.getFromServer(createRes.result.id, form.collection))
    .toMatchSnapshot("skip refetch if present")
  await appRef.cleanUp()
}, 10000)
