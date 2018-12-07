import { makeStat } from "@xpfw/dm"
import { FormStore } from "@xpfw/form-shared"
import { getRandomApp } from "@xpfw/test-util"
import { FeathersClient } from "@xpfw/ui-feathers"
import {
  BackendClient
} from "@xpfw/ui-shared"
import ValidationRegistry, { IForm, StatType } from "@xpfw/validate"
import "isomorphic-fetch"
import { set } from "lodash"
import * as React from "react"
import { matchStoreState } from "resub-persist"
import StatStore from "../store/stat"
import makeMockElement from "../testUtil/baseMock"
import { pathSum, simpleSum, sumForm } from "../testUtil/defs"
import render from "../testUtil/render"
import statServiceConfigurator from "../testUtil/statService"
import SharedStatWrapper from "./stat"

BackendClient.client = FeathersClient

test("makeStat test", async () => {
  const collection = sumForm.collection
  ValidationRegistry.registerForm(sumForm)
  const appRef = await getRandomApp(collection, false, BackendClient.client, false)
  appRef.app.configure(statServiceConfigurator)
  for (let i = 0; i < 10; i++) {
    await BackendClient.client.create(collection, {
      bla: "blubb",
      myNum: i * 42
    })
  }
  const MockEle = makeMockElement("stat")
  const StatMock = SharedStatWrapper(MockEle)
  matchStoreState(StatStore, "Before anything")
  await StatStore.fetchStat(collection, simpleSum, {}, false)
  render(<StatMock collection={sumForm.collection} configId={simpleSum.id} />, "simpleSum local")
  await StatStore.fetchStat(collection, pathSum, {}, false)
  render(<StatMock collection={sumForm.collection} configId={pathSum.id} />, "pathSum local")
  set(StatStore, "stats", {})
  render(<StatMock collection={sumForm.collection} configId={simpleSum.id} />, "simpleSum after reset")
  render(<StatMock collection={sumForm.collection} configId={pathSum.id} />, "pathSum after reset")
  await StatStore.fetchStat(collection, simpleSum, {}, true)
  render(<StatMock collection={sumForm.collection} configId={simpleSum.id} />, "simpleSum server")
  await StatStore.fetchStat(collection, pathSum, {}, true)
  render(<StatMock collection={sumForm.collection} configId={pathSum.id} />, "pathSum server")
  await appRef.cleanUp()
}, 10000)
