import { BackendClient } from "@xpfw/data"
import { IStatConfig, makeStat } from "@xpfw/dm"
import { prependPrefix } from "@xpfw/form"
import { get, isEqual, isNil, set } from "lodash"
import { observable } from "mobx"

export interface IUseStatOptions {
  /**
   * Whether to use calculate the data locally on the client side via many find calls or whether this should be taken care of by the server
   */
  useServer?: boolean
  /**
   * If this is specified $gte and $lte will be set to the values of `TimeBeginField` and `TimeEndField`
   */
  dateQueryPath?: string
  conertToDate?: boolean
}
export class StatStore {
  public statCollection = "stats"
  @observable
  private stats: any = {}
  private previousQuery: any = {}

  public async fetchStat(collection: string, config: IStatConfig, query: any, useServer?: boolean, prefix?: string, options?: IUseStatOptions) {
    let statRes: any
    if (useServer) {
      statRes = await BackendClient.client.create(this.statCollection, {
        collection, config, query, options
      })
    } else {
      statRes = await makeStat(BackendClient.client.find, collection, config, query)
    }
    const valKey = `${prependPrefix(collection, prefix)}.${config.id}`
    this.stats[valKey] = statRes
  }

  public getStat(valuePath: string, collection: string,
                 config: IStatConfig, query: any, useServer?: boolean, prefix?: string, options?: IUseStatOptions): any {
    const value = get(this.stats, valuePath)
    const previousQuery = get(this.previousQuery, valuePath)
    if (isNil(value) || !isEqual(previousQuery, query)) {
      set(this.previousQuery, valuePath, query)
      this.fetchStat(collection, config, query, useServer, prefix, options)
    }
    return value
  }
}

export default new StatStore()
