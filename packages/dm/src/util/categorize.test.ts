import iterateEachInFind from "../iterateEachInFind"
import iterateMockDataInFind from "../testUtil/iterateMockDataInFind"
import categorize from "./categorize"

test("verify cat caluclation", async () => {
  expect(await iterateEachInFind("unknown", {}, iterateMockDataInFind, categorize({itemPath: "myString"}), {
    pageSize: 5
  }))
    .toMatchSnapshot("using itempath myNum of mockData")
  expect(await iterateEachInFind("unknown", {}, iterateMockDataInFind, categorize({itemPath: "cat"}), {
    pageSize: 5
  }))
    .toMatchSnapshot("using itempath cat of mockData")
})
