import { ensureDate, IStatConfig, StatType } from "@xpfw/dm"
import { FormStore, prependPrefix } from "@xpfw/form"
import { set } from "lodash"
import StatStore from "../store/stat"
import { TimeBeginField, TimeEndField } from "./fields"

export interface IUseStatOptions {
  /**
   * Whether to use calculate the data locally on the client side via many find calls or whether this should be taken care of by the server
   */
  useServer?: boolean
  /**
   * If this is specified $gte and $lte will be set to the values of `TimeBeginField` and `TimeEndField`
   */
  dateQueryPath?: string
}

const useStat = (config: IStatConfig, collection: string, options?: IUseStatOptions,  prefix?: string) => {
  const query: any = {}
  const useServer = options != null ? options.useServer : false
  if (options != null && options.dateQueryPath != null) {
    const gte: any = FormStore.getValue(TimeBeginField.title, prefix)
    if (gte != null) {
      set(query, `${options.dateQueryPath}.$gte`, ensureDate(gte))
    }
    const lte: any = FormStore.getValue(TimeEndField.title, prefix)
    if (lte != null) {
      set(query, `${options.dateQueryPath}.$lte`, ensureDate(lte))
    }
  }
  const stat: any = StatStore.getStat(`${prependPrefix(collection, prefix)}.${config.id}`,
    collection, config, query, useServer)
  return {
    stat, config, query
  }
}

export default useStat
