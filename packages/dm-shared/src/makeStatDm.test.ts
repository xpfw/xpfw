import {
  BackendClient
} from "@xpfw/data"
import { FeathersClient } from "@xpfw/data-feathers"
import { makeStat, StatType } from "@xpfw/dm"
import { getRandomApp } from "@xpfw/test-util"
import "isomorphic-fetch"

BackendClient.client = FeathersClient

test("makeStat test", async () => {
  const collection = "my"
  const appRef = await getRandomApp(collection, false, BackendClient.client, true)
  for (let i = 0; i < 10; i++) {
    BackendClient.client.create(collection, {
      bla: "blubb",
      myNum: i * 42
    })
  }
  expect(await makeStat(BackendClient.client.find, collection, {
    type: StatType.sum,
    id: "a"
  }, {}))
    .toMatchSnapshot("regular")
  expect(await makeStat(BackendClient.client.find, collection, {
    type: StatType.sum,
    options: {itemPath: "myNum"},
    id: "b"
  }, {}))
    .toMatchSnapshot("withCoinfig")
  await appRef.cleanUp()
}, 10000)
