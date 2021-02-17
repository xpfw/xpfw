
import MockDate from "mockdate"
MockDate.set(new Date(259542000000))

import * as moment from "moment"
import iterateEachInFind from "../iterateEachInFind"
import iterateMockDateDataInFind from "../testUtil/iterateMockDateDataInFind"
import getTimeSteps from "./getTimesteps"
import timestepSum from "./timeStepSum"

test("verify sum caluclation", async () => {
  const gte = moment().subtract(10, "d").toDate()
  const lte = moment().add(10, "d").toDate()
  expect(await iterateEachInFind("unknown", {}, iterateMockDateDataInFind, timestepSum({
    datePath: "createdAt",
    timeSteps: getTimeSteps(gte, lte)
  }), {
    pageSize: 5
  }))
    .toMatchSnapshot("configless mean of mockData")
  expect(await iterateEachInFind("unknown", {}, iterateMockDateDataInFind, timestepSum({
    itemPath: "myNum",
    datePath: "createdAt",
    timeSteps: getTimeSteps(gte, lte)
  }), {
    pageSize: 5
  }))
    .toMatchSnapshot("using itempath myNum of mockData")
  expect(await iterateEachInFind("unknown", {}, iterateMockDateDataInFind, timestepSum({
    itemPath: "myNum",
    datePath: "createdAt",
    timeSteps: getTimeSteps(moment().subtract(3, "months").toDate(), lte)
  }), {
    pageSize: 5
  }))
    .toMatchSnapshot("using itempath myNum of mockData with monthlist")
  expect(await iterateEachInFind("unknown", {}, iterateMockDateDataInFind, timestepSum({
    itemPath: "myNum",
    datePath: "createdAt",
    timeSteps: getTimeSteps(moment().subtract(3, "y").toDate(), lte)
  }), {
    pageSize: 5
  }))
    .toMatchSnapshot("using itempath myNum of mockData with yearlist")
})
