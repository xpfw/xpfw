import "isomorphic-fetch"
import * as MockDate from "mockdate"
MockDate.set(new Date(4, 2, 0))

import { getRandomApp } from "@xpfw/test-util"
import { DbStore } from "@xpfw/ui-shared"
import { TestDefs } from "@xpfw/validate"
import { matchStoreState } from "resub-persist"
import { FeathersClient } from "./index"

const st = (am: number) => new Promise((resolve, reject) => setTimeout(resolve, am))

test("realtime Test", async () => {
  const s: any = TestDefs.FormNumberAndRequiredText.collection
  const prefix = "createpref"
  const dbStore = {}
  const collections = [s]
  const appRef = await getRandomApp(s, false, FeathersClient, false, {
    dbStore: DbStore, collections
  })
  const userData = {
    email: "bla", password: "bla", strategy: "local"
  }
  await FeathersClient.register(userData)
  await FeathersClient.login(userData)
  matchStoreState(DbStore, "before realtime events arrived")
  await appRef.app.service(s).create({bla: "1"})
  await appRef.app.service(s).create({bla: "4"})
  const fiveCreate = await appRef.app.service(s).create({bla: "5"})
  await appRef.app.service(s).create({bla: "2"})
  await st(100)
  matchStoreState(DbStore, "after realtime events arrived")
  await appRef.app.service(s).remove(fiveCreate.id)
  await st(100)
  matchStoreState(DbStore, "after realtime remove arrived")
  await appRef.cleanUp()
}, 10000)
