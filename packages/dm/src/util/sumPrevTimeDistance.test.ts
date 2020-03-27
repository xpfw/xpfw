
import * as MockDate from "mockdate"
MockDate.set(new Date(259542000000))

import iterateEachInFind from "../iterateEachInFind"
import iterateMockDateDataInFind from "../testUtil/iterateMockDateDataInFind"
import sumPrevTimeDistance from "./sumPrevTimeDistance"

test("verify sum caluclation", async () => {
  expect(await iterateEachInFind("unknown", {}, iterateMockDateDataInFind, sumPrevTimeDistance({
    itemPath: "createdAt"
  }), {
    pageSize: 5
  }))
    .toMatchSnapshot("configless mean of mockData")
})
