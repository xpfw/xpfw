
import * as MockDate from "mockdate"
MockDate.set(new Date(1978, 2, 24))

import * as moment from "moment"
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
