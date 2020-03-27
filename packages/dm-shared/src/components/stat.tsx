import { ensureDate, IStatConfig, StatType } from "@xpfw/dm"
import { FormStore, prependPrefix } from "@xpfw/form"
import { get, set } from "lodash"
import StatStore, { IUseStatOptions } from "../store/stat"
import { TimeBeginField, TimeEndField } from "./fields"

const useStat = (config: IStatConfig, collection: string, options?: IUseStatOptions,  prefix?: string) => {
  const query: any = {}
  const useServer = options != null ? options.useServer : false
  if (options != null && options.dateQueryPath != null) {
    const gte: any = FormStore.getValue(TimeBeginField.title, prefix)
    if (gte != null) {
      set(query, `${options.dateQueryPath}.$gte`, gte)
    }
    const lte: any = FormStore.getValue(TimeEndField.title, prefix)
    if (lte != null) {
      set(query, `${options.dateQueryPath}.$lte`, lte)
    }
  }
  const stat: any = StatStore.getStat(`${prependPrefix(collection, prefix)}.${config.id}`,
    collection, config, query, useServer, prefix, options)
  return {
    stat, config, query
  }
}

export default useStat
