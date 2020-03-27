
import { cloneDeep, get } from "lodash"
import { StatType } from "./globals"
import iterateEachInFind, { IEachInFindOptions } from "./iterateEachInFind"
import statTypes from "./statTypes"
import { IFindMethod, IStatConfig } from "./typeDef"
import getTimeSteps from "./util/getTimesteps"
import sum from "./util/sum"

const makeStat =
async (findMethod: IFindMethod, collection: string,
       chartConfig: IStatConfig, query: any, options?: IEachInFindOptions) => {
  const maker: any = get(statTypes, chartConfig.type, sum)
  const origOptions = chartConfig.options
  chartConfig.options = cloneDeep(chartConfig.options)
  if (chartConfig.type === StatType.timeStep && get(query, "createdAt.$gte")) {
    chartConfig.options.timeSteps = getTimeSteps(
      get(query, "createdAt.$gte"),
      get(query, "createdAt.$lte"))
  }
  const calculator = maker(chartConfig.options)
  chartConfig.options = origOptions
  const result = await iterateEachInFind(collection, query, findMethod, calculator, options)
  return result
}

export default makeStat
