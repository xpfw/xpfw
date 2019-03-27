import { BackendClient } from "@xpfw/data"
import { IStatConfig, makeStat } from "@xpfw/dm"
import { prependPrefix } from "@xpfw/form"
import { get, isEqual, isNil, set } from "lodash"
import { observable } from "mobx"

export class StatStore {
  public statCollection = "stats"
  @observable
  private stats: any = {}
  private previousQuery: any = {}

  public async fetchStat(collection: string, config: IStatConfig, query: any, useServer?: boolean, prefix?: string) {
    let statRes: any
    if (useServer) {
      statRes = await BackendClient.client.create(this.statCollection, {
        collection, config, query
      })
    } else {
      statRes = await makeStat(BackendClient.client.find, collection, config, query)
    }
    const valKey = `${prependPrefix(collection, prefix)}.${config.id}`
    this.stats[valKey] = statRes
  }

  public getStat(valuePath: string, collection: string,
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
