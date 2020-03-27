import {
  BackendClient,
  toJS
} from "@xpfw/data"
import { FeathersClient } from "@xpfw/data-feathers"
import { StatRegistry } from "@xpfw/dm"
import { getRandomApp } from "@xpfw/test-util"
import "isomorphic-fetch"
import { set } from "lodash"
import { pathSum, simpleSum } from "../testUtil/defs"
import statServiceConfigurator from "../testUtil/statService"
import StatStore from "./stat"

BackendClient.client = FeathersClient

test("makeStat test", async () => {
  const collection = "sum"
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
  expect(toJS(StatStore)).toMatchSnapshot("Before anything")
  await StatStore.fetchStat(collection, simpleSum, {}, false)
  expect(toJS(StatStore)).toMatchSnapshot("after simple sum")
  await StatStore.fetchStat(collection, pathSum, {}, false)
  expect(toJS(StatStore)).toMatchSnapshot("after add summ")
  set(StatStore, "stats", {})
  expect(toJS(StatStore)).toMatchSnapshot("after reset")
  await StatStore.fetchStat(collection, simpleSum, {}, false)
  expect(toJS(StatStore)).toMatchSnapshot("after server simple sum")
  await StatStore.fetchStat(collection, pathSum, {}, true)
  expect(toJS(StatStore)).toMatchSnapshot("after server add summ")
  await appRef.cleanUp()
}, 10000)
