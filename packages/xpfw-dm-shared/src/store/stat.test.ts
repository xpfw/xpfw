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
import { matchStoreState } from "resub-persist"
import { pathSum, simpleSum, sumForm } from "../testUtil/defs"
import statServiceConfigurator from "../testUtil/statService"
import StatStore from "./stat"

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
  matchStoreState(StatStore, "Before anything")
  await StatStore.fetchStat(collection, simpleSum, {}, false)
  matchStoreState(StatStore, "after simple sum")
  await StatStore.fetchStat(collection, pathSum, {}, false)
  matchStoreState(StatStore, "after add summ")
  set(StatStore, "stats", {})
  matchStoreState(StatStore, "after reset")
  await StatStore.fetchStat(collection, simpleSum, {}, false)
  matchStoreState(StatStore, "after server simple sum")
  await StatStore.fetchStat(collection, pathSum, {}, true)
  matchStoreState(StatStore, "after server add summ")
  await appRef.cleanUp()
}, 10000)
