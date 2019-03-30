import { ensureDate, IStatConfig, StatType } from "@xpfw/dm"
import { FormStore, prependPrefix } from "@xpfw/form"
import StatStore from "../store/stat"
import { TimeBeginField, TimeEndField } from "./fields"

const useStat = (config: IStatConfig, collection: string, useServer?: boolean, prefix?: string) => {
  const query: any = {}
  if (config.type === StatType.timeStep) {
    const gte: any = FormStore.getValue(TimeBeginField.title, prefix)
    const lte: any = FormStore.getValue(TimeEndField.title, prefix)
    query.createdAt = {
      $gte: ensureDate(gte),
      $lte: ensureDate(lte)
    }
  }
  const stat: any = StatStore.getStat(
    `${prependPrefix(collection, prefix)}.${config.id}`,
    collection, config, query, useServer)
  return {
    stat, config, query
  }
}

export default useStat
