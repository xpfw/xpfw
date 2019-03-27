import {
  BackendClient, toJS
} from "@xpfw/data"
import { FeathersClient } from "@xpfw/data-feathers"
import { StatRegistry } from "@xpfw/dm"
import { getRandomApp } from "@xpfw/test-util"
import "isomorphic-fetch"
import { set } from "lodash"
import * as React from "react"
import StatStore from "../store/stat"
import makeMockElement from "../testUtil/baseMock"
import { pathSum, simpleSum, sumForm } from "../testUtil/defs"
import render from "../testUtil/render"
import statServiceConfigurator from "../testUtil/statService"
import useStat from "./stat"

BackendClient.client = FeathersClient

test("makeStat test", async () => {
  const collection = sumForm.collection
  StatRegistry[simpleSum.id] = simpleSum
  StatRegistry[pathSum.id] = pathSum
  const appRef = await getRandomApp(collection, false, BackendClient.client, false)
  appRef.app.configure(statServiceConfigurator)
  for (let i = 0; i < 10; i++) {
    await BackendClient.client.create(collection, {
      bla: "blubb",
      myNum: i * 42
    })
  }
  const StatMock = makeMockElement("stat",
    (props: any) => useStat(props.config, props.collection, props.useServer, props.prefix))
  expect(toJS(StatStore)).toMatchSnapshot("Before anything")
  await StatStore.fetchStat(collection, simpleSum, {}, false)
  render(<StatMock collection={sumForm.collection} config={simpleSum} />, "simpleSum local")
  await StatStore.fetchStat(collection, pathSum, {}, false)
  render(<StatMock collection={sumForm.collection} config={pathSum} />, "pathSum local")
  set(StatStore, "stats", {})
  render(<StatMock collection={sumForm.collection} config={simpleSum} />, "simpleSum after reset")
  render(<StatMock collection={sumForm.collection} config={pathSum} />, "pathSum after reset")
  await StatStore.fetchStat(collection, simpleSum, {}, true)
  render(<StatMock collection={sumForm.collection} config={simpleSum} />, "simpleSum server")
  await StatStore.fetchStat(collection, pathSum, {}, true)
  render(<StatMock collection={sumForm.collection} config={pathSum} />, "pathSum server")
  await appRef.cleanUp()
}, 10000)
