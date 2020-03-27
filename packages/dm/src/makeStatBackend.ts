import { isNil } from "lodash"
import { IEachInFindOptions } from "./iterateEachInFind"
import makeStat from "./makeStat"
import StatRegistry from "./statRegistry"
import { IFindMethod, IStatConfig } from "./typeDef"

/**
 * Same as makeStat but also checks that config is original
 * @param client
 * @param collection
 * @param chartConfig
 * @param query
 */
const makeStatBackend = async (findMethod: IFindMethod, collection: string, chartConfig: IStatConfig, query: any, options?: IEachInFindOptions) => {
  const origConfig: any = StatRegistry[chartConfig.id]
  if (isNil(origConfig)) {
    throw new Error("invalid chartConfig")
  }
  return makeStat(findMethod, collection, origConfig, query, options)
}

export default makeStatBackend
