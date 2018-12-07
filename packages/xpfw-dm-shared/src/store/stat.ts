import { makeStat } from "@xpfw/dm"
import { BackendClient } from "@xpfw/ui-shared"
import {
   IStatConfig, IUiClient, prefixMaker
} from "@xpfw/validate"
import { get, isEqual, isFunction, isNil, isObject, set } from "lodash"
import { autoSubscribe, AutoSubscribeStore, key, StoreBase } from "resub"
import { IPersistableStore } from "resub-persist"

@AutoSubscribeStore
export class StatStore extends StoreBase implements IPersistableStore {
  public name = "statData"
  public statCollection = "stats"
  private stats: any = {}
  private previousQuery: any = {}
  public getPropKeys() { return ["stats"] }

  public async fetchStat(collection: string, config: IStatConfig, query: any, useServer?: boolean, prefix?: string) {
    let statRes: any
    if (useServer) {
      statRes = await BackendClient.client.create(this.statCollection, {
        collection, config, query
      })
    } else {
      statRes = await makeStat(BackendClient.client, collection, config, query)
    }
    const valKey = `${prefixMaker(prefix)}${collection}.${config.id}`
    this.stats[valKey] = statRes
    this.trigger(valKey)
  }

  @autoSubscribe
  public getStat(@key valuePath: string, collection: string,
                 config: IStatConfig, query: any, useServer?: boolean, prefix?: string): any {
    const value = get(this.stats, valuePath)
    const previousQuery = get(this.previousQuery, valuePath)
    if (isNil(value) || !isEqual(previousQuery, query)) {
      set(this.previousQuery, valuePath, query)
      this.fetchStat(collection, config, query, useServer, prefix)
    }
    return value
  }
}

export default new StatStore()
