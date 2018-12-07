import iterateEachInFind from "../iterateEachInFind"
import iterateMockDataInFind from "../testUtil/iterateMockDataInFind"
import sum from "./sum"

test("verify sum caluclation", async () => {
  expect(await iterateEachInFind("unknown", {}, iterateMockDataInFind, sum(), {
    pageSize: 5
  }))
    .toMatchSnapshot("configless mean of mockData")
  expect(await iterateEachInFind("unknown", {}, iterateMockDataInFind, sum({itemPath: "myNum"}), {
    pageSize: 5
  }))
    .toMatchSnapshot("using itempath myNum of mockData")
})
