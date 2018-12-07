import {
  IStatConfig, IUiClient, ValidationRegistry
} from "@xpfw/validate"
import { find, get, isNil } from "lodash"
import { IEachInFindOptions } from "./iterateEachInFind"
import makeStat from "./makeStat"

/**
 * Same as makeStat but also checks that config is original
 * @param client
 * @param collection
 * @param chartConfig
 * @param query
 */
const makeStatBackend = async (client: IUiClient, collection: string, chartConfig: IStatConfig, query: any, options?: IEachInFindOptions) => {
  const configs = get(ValidationRegistry.forms, collection + ".stats", [])
  const origConfig: any = find(configs, ["id", chartConfig.id])
  if (isNil(origConfig)) {
    throw new Error("invalid chartConfig")
  }
  return makeStat(client, collection, origConfig, query, options)
}

export default makeStatBackend
