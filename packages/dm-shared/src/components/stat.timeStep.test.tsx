import { getTimeSteps } from "@xpfw/dm"
import { getRandomApp } from "@xpfw/test-util"
import { FeathersClient } from "@xpfw/ui-feathers"
import {
  BackendClient
} from "@xpfw/ui-shared"
import ValidationRegistry from "@xpfw/validate"
import "isomorphic-fetch"
import { cloneDeep } from "lodash"
import * as momentA from "moment"
import * as React from "react"
import StatStore from "../store/stat"
import makeMockElement from "../testUtil/baseMock"
import {
  timeStepForm, timeStepSum, timeStepSumPath, timeStepTimeDistance
} from "../testUtil/defs"
import render from "../testUtil/render"
import statServiceConfigurator from "../testUtil/statService"
import SharedStatWrapper from "./stat"
const moment = momentA

BackendClient.client = FeathersClient

test("makeStat timeStep test", async () => {
  const collection = timeStepForm.collection
  ValidationRegistry.registerForm(timeStepForm)
  const appRef = await getRandomApp(collection, false, BackendClient.client, false)
  appRef.app.configure(statServiceConfigurator)
  for (let i = 0; i < 250; i++) {
    await BackendClient.client.create(collection, {
      myNum: i * 2,
      createdAt: i % 2 === 0 ?
        moment().subtract(i, "days").toDate() : moment().add(i, "days").toDate()
    })
  }
  const MockEle = makeMockElement("stat")
  const StatMock = SharedStatWrapper(MockEle)
  const configs: any[] = [
    {msg: " noquery", stat: timeStepSum, query: {}},
    {msg: " month query", stat: timeStepSum, query: {
      createdAt: {
        $gte: moment().startOf("month").toDate(),
        $lte: moment().endOf("month").toDate()
      }
    }},
    {msg: " year query", stat: timeStepSum, query: {
      createdAt: {
        $gte: moment().startOf("year").toDate(),
        $lte: moment().endOf("year").toDate()
      }
    }},
    {msg: " noquery", stat: timeStepSumPath, query: {}},
    {msg: " month query", stat: timeStepSumPath, query: {
      createdAt: {
        $gte: moment().startOf("month").toDate(),
        $lte: moment().endOf("month").toDate()
      }
    }},
    {msg: " year query", stat: timeStepSumPath, query: {
      createdAt: {
        $gte: moment().startOf("year").toDate(),
        $lte: moment().endOf("year").toDate()
      }
    }},
    {msg: " noquery", stat: timeStepTimeDistance, query: {}},
    {msg: " month query", stat: timeStepTimeDistance, query: {
      createdAt: {
        $gte: moment().startOf("month").toDate(),
        $lte: moment().endOf("month").toDate()
      }
    }},
    {msg: " year query", stat: timeStepTimeDistance, query: {
      createdAt: {
        $gte: moment().startOf("year").toDate(),
        $lte: moment().endOf("year").toDate()
      }
    }}
  ]
  for (const useServer of [false, true]) {
    const serverString = useServer ? " online " : " local "
    for (const config of configs) {
      const origOptions = config.stat.options
      if (config.query.createdAt) {
        config.stat.options = cloneDeep(origOptions)
        config.stat.options.timeSteps = getTimeSteps(config.query.createdAt.$gte, config.query.createdAt.$lte)
      }
      await StatStore.fetchStat(collection, config.stat, config.query, false)
      render(<StatMock collection={timeStepForm.collection} configId={config.stat.id} />,
        serverString + config.stat.id + config.msg)
      config.stat.options = origOptions
    }
  }

  await appRef.cleanUp()
}, 10000)
