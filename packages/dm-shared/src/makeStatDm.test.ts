import { makeStat } from "@xpfw/dm"
import { FormStore } from "@xpfw/form-shared"
import { getRandomApp } from "@xpfw/test-util"
import { FeathersClient } from "@xpfw/ui-feathers"
import {
  BackendClient
} from "@xpfw/ui-shared"
import { StatType } from "@xpfw/validate"
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
  expect(await makeStat(BackendClient.client, collection, {
    type: StatType.sum
  }, {}))
    .toMatchSnapshot("regular")
  expect(await makeStat(BackendClient.client, collection, {
    type: StatType.sum,
    options: {itemPath: "myNum"}
  }, {}))
    .toMatchSnapshot("withCoinfig")
  await appRef.cleanUp()
}, 10000)
