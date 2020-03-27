import iterateEachInFind from "../iterateEachInFind"
import iterateMockDataInFind from "../testUtil/iterateMockDataInFind"
import mean from "./mean"

test("verify mean caluclation", async () => {
  expect(await iterateEachInFind("unknown", {}, iterateMockDataInFind, mean()))
    .toMatchSnapshot("configless mean of mockData")
  expect(await iterateEachInFind("unknown", {}, iterateMockDataInFind, mean({itemPath: "myNum"})))
    .toMatchSnapshot("using itempath myNum of mockData")
})
