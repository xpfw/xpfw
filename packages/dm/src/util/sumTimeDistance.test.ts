
import * as MockDate from "mockdate"
MockDate.set(new Date(259542000000))

import iterateEachInFind from "../iterateEachInFind"
import iterateMockDateDataInFind from "../testUtil/iterateMockDateDataInFind"
import sumTimeDistance from "./sumTimeDistance"

test("verify sum caluclation", async () => {
  expect(await iterateEachInFind("unknown", {}, iterateMockDateDataInFind, sumTimeDistance({
    itemPath: "createdAt",
    compareWithPath: "compDate"
  }), {
    pageSize: 5
  }))
    .toMatchSnapshot("configless mean of mockData")
})
