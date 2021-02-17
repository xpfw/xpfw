import {
  BackendClient
} from "@xpfw/data"
import { FeathersClient } from "@xpfw/data-feathers"
import { getTimeSteps, StatRegistry } from "@xpfw/dm"
import { getRandomApp } from "@xpfw/test-util"
import "isomorphic-fetch"
import { cloneDeep } from "lodash"
import MockDate from "mockdate"
import momentA from "moment"
import * as React from "react"
import StatStore from "../store/stat"
import makeMockElement from "../testUtil/baseMock"
import {
  timeStepSum, timeStepSumPath, timeStepTimeDistance
} from "../testUtil/defs"
import render from "../testUtil/render"
import statServiceConfigurator from "../testUtil/statService"
import SharedStatWrapper from "./stat"
import useStat from "./stat"

MockDate.set(new Date(2014, 2, 1))

const moment = momentA

BackendClient.client = FeathersClient

test("makeStat timeStep test", async () => {
  const collection = "timeStep"
  const appRef = await getRandomApp(collection, false, BackendClient.client, false)
  appRef.app.configure(statServiceConfigurator)
  for (let i = 0; i < 250; i++) {
    await BackendClient.client.create(collection, {
      myNum: i * 2,
      createdAt: i % 2 === 0 ?
        moment().subtract(i, "days").toDate() : moment().add(i, "days").toDate()
    })
  }
  const StatMock = makeMockElement("stat",
    (props: any) => useStat(props.config, props.collection, {useServer: props.useServer, dateQueryPath: "createdAt"}, props.prefix))
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
      StatRegistry[config.id] = config
      const origOptions = config.stat.options
      if (config.query.createdAt) {
        config.stat.options = cloneDeep(origOptions)
        config.stat.options.timeSteps = getTimeSteps(config.query.createdAt.$gte, config.query.createdAt.$lte)
      }
      await StatStore.fetchStat(collection, config.stat, config.query, false)
      render(<StatMock collection={collection} config={config.stat} />,
        serverString + config.stat.id + config.msg)
      config.stat.options = origOptions
    }
  }

  await appRef.cleanUp()
}, 10000)
