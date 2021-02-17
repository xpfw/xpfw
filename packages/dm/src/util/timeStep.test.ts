
import MockDate from "mockdate"
MockDate.set(new Date(259542000000))

import * as momentA from "moment"
import {StatType} from "../globals"
import iterateEachInFind from "../iterateEachInFind"
import iterateMockDateDataInFind from "../testUtil/iterateMockDateDataInFind"
import getTimeSteps from "./getTimesteps"
import timeStep from "./timeStep"

const moment: any = momentA

test("verify timeStep caluclation", async () => {
  const gte = moment().subtract(10, "d").toDate()
  const lte = moment().add(10, "d").toDate()
  const toTry = [
    {
      type: StatType.sum, config: {}, msg: "configless sum", gte, lte
    },
    {
      type: StatType.sum, config: {itemPath: "myNum"}, gte, lte,
      msg: "sum using itempath myNum of mockData"
    },
    {
      type: StatType.sum, config: {itemPath: "myNum"},
      gte: moment().subtract(3, "months").toDate(), lte,
      msg: "sum using itempath myNum of mockData and months"
    },
    {
      type: StatType.sum, config: {itemPath: "myNum"},
      gte: moment().subtract(3, "y").toDate(), lte,
      msg: "sum using itempath myNum of mockData and years"
    },
    {
      type: StatType.mean, config: {itemPath: "myNum"}, gte, lte,
      msg: "mean using itempath myNum of mockData"
    },
    {
      type: StatType.mean, config: {itemPath: "myNum"},
      gte: moment().subtract(3, "months").toDate(), lte,
      msg: "mean using itempath myNum of mockData and months"
    },
    {
      type: StatType.mean, config: {itemPath: "myNum"},
      gte: moment().subtract(3, "y").toDate(), lte,
      msg: "mean using itempath myNum of mockData and years"
    },
    {
      type: StatType.sumTimeDistance, config: {itemPath: "createdAt", compareWithPath: "compDate"}, gte, lte,
      msg: "sumTimeDistance using itempath createdAt of mockData"
    },
    {
      type: StatType.sumTimeDistance, config: {itemPath: "createdAt", compareWithPath: "compDate"},
      gte: moment().subtract(3, "months").toDate(), lte,
      msg: "sumTimeDistance using itempath createdAt of mockData and months"
    },
    {
      type: StatType.sumTimeDistance, config: {itemPath: "createdAt", compareWithPath: "compDate"},
      gte: moment().subtract(3, "y").toDate(), lte,
      msg: "sumTimeDistance using itempath createdAt of mockData and years"
    },
    {
      type: StatType.sumPrevTimeDistance, config: {itemPath: "createdAt"}, gte, lte,
      msg: "sumPrevTimeDistance using itempath createdAt of mockData"
    },
    {
      type: StatType.sumPrevTimeDistance, config: {itemPath: "createdAt"},
      gte: moment().subtract(3, "months").toDate(), lte,
      msg: "sumPrevTimeDistance using itempath createdAt of mockData and months"
    },
    {
      type: StatType.sumPrevTimeDistance, config: {itemPath: "createdAt"},
      gte: moment().subtract(3, "y").toDate(), lte,
      msg: "sumPrevTimeDistance using itempath createdAt of mockData and years"
    },
    {
      type: StatType.avgTimeDistance, config: {itemPath: "createdAt", compareWithPath: "compDate"}, gte, lte,
      msg: "avgTimeDistance using itempath createdAt of mockData"
    },
    {
      type: StatType.avgTimeDistance, config: {itemPath: "createdAt", compareWithPath: "compDate"},
      gte: moment().subtract(3, "months").toDate(), lte,
      msg: "avgTimeDistance using itempath createdAt of mockData and months"
    },
    {
      type: StatType.avgTimeDistance, config: {itemPath: "createdAt", compareWithPath: "compDate"},
      gte: moment().subtract(3, "y").toDate(), lte,
      msg: "avgTimeDistance using itempath createdAt of mockData and years"
    },
    {
      type: StatType.avgPrevTimeDistance, config: {itemPath: "createdAt"}, gte, lte,
      msg: "avgPrevTimeDistance using itempath createdAt of mockData"
    },
    {
      type: StatType.avgPrevTimeDistance, config: {itemPath: "createdAt"},
      gte: moment().subtract(3, "months").toDate(), lte,
      msg: "avgPrevTimeDistance using itempath createdAt of mockData and months"
    },
    {
      type: StatType.avgPrevTimeDistance, config: {itemPath: "createdAt"},
      gte: moment().subtract(3, "y").toDate(), lte,
      msg: "avgPrevTimeDistance using itempath createdAt of mockData and years"
    }
  ]
  for (const myTry of toTry) {
    expect(
      await iterateEachInFind("unknown", {}, iterateMockDateDataInFind, timeStep({
        subType: myTry.type,
        subConfig: myTry.config,
        datePath: "createdAt",
        timeSteps: getTimeSteps(myTry.gte, myTry.lte)
      }))).toMatchSnapshot(myTry.msg)
  }
})
