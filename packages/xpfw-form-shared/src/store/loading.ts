import { IFieldError, IFormError } from "@xpfw/validate"
import { get, set } from "lodash"
import { autoSubscribe, AutoSubscribeStore, key, StoreBase } from "resub"
import { IPersistableStore } from "resub-persist"

@AutoSubscribeStore
export class LoadingStore extends StoreBase implements IPersistableStore {
    public name = "loading"
    private loading: {[path: string]: boolean} = {}

    public getPropKeys() { return ["loading"] }

    public setLoading(valuePath: string, value: any) {
      if (value === true) {
        this.loading[valuePath] = true
      } else {
        delete this.loading[valuePath]
      }
      this.trigger(valuePath)
    }

    @autoSubscribe
    public getLoading(@key path: string): boolean {
      return this.loading[path] ? true : false
    }

    @autoSubscribe
    public isSomethingLoading(): boolean {
      return Object.keys(this.loading).length > 0
    }
}

export default new LoadingStore()
