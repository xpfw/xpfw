import "isomorphic-fetch"
import * as MockDate from "mockdate"
MockDate.set(new Date(4, 2, 0))

import { DbStore, toJS, dataOptions } from "@xpfw/data"
import { getRandomApp } from "@xpfw/test-util"
import { FeathersClient } from "./index"

const st = (am: number) => new Promise((resolve, reject) => setTimeout(resolve, am))
dataOptions.idPath = "id"
test("realtime Test", async () => {
  const s: any = "lala"
  const collections = [s]
  const appRef = await getRandomApp(s, false, FeathersClient, false, {
    dbStore: DbStore, collections
  })
  const userData = {
    email: "bla", password: "bla", strategy: "local"
  }
  await FeathersClient.register(userData)
  await FeathersClient.login(userData)
  expect(toJS(DbStore)).toMatchSnapshot("before realtime events arrived")
  await appRef.app.service(s).create({bla: "1"})
  await appRef.app.service(s).create({bla: "4"})
  const fiveCreate = await appRef.app.service(s).create({bla: "5"})
  await appRef.app.service(s).create({bla: "2"})
  await st(100)
  expect(toJS(DbStore)).toMatchSnapshot("after realtime events arrived")
  await appRef.app.service(s).remove(fiveCreate.id)
  await st(100)
  expect(toJS(DbStore)).toMatchSnapshot("after realtime remove arrived")
  await appRef.cleanUp()
}, 10000)
