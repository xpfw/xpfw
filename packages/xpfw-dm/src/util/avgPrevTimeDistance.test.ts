
import * as MockDate from "mockdate"
MockDate.set(new Date(1978, 2, 24))

import iterateEachInFind from "../iterateEachInFind"
import iterateMockDateDataInFind from "../testUtil/iterateMockDateDataInFind"
import avgPrevTimeDistance from "./avgPrevTimeDistance"

test("verify avgprevtimedistance caluclation", async () => {
  expect(await iterateEachInFind("unknown", {}, iterateMockDateDataInFind, avgPrevTimeDistance({
    itemPath: "createdAt"
  })))
    .toMatchSnapshot("configless mean of mockData")
})
