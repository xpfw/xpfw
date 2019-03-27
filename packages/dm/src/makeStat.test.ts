import { StatType } from "./globals"
import makeStat from "./makeStat"

test("makeStat test", async () => {
  const findMethod = (c: string, q: any) => {
    return Promise.resolve({total: 5, data: [
      {myNum: 21, jh: "we"}, {myNum: 55, ju: "3"},
      {myNum: 12, k: "4"}, {l: "ö"}, {r: "e"}
    ]})
  }
  const client: any = {
    find: findMethod
  }
  const collection = "my"
  expect(await makeStat(client, collection, {
    type: StatType.sum
  }, {}, {pageSize: 5}))
    .toMatchSnapshot("regular")
  expect(await makeStat(client, collection, {
    type: StatType.sum,
    options: {itemPath: "myNum"}
  }, {}, {pageSize: 5}))
    .toMatchSnapshot("withCoinfig")
}, 10000)
