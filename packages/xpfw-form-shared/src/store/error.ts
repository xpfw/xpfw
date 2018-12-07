import { IFieldError, IFormError } from "@xpfw/validate"
import { get, set } from "lodash"
import { autoSubscribe, AutoSubscribeStore, key, StoreBase } from "resub"
import { IPersistableStore } from "resub-persist"

@AutoSubscribeStore
export class FormErrorStore extends StoreBase implements IPersistableStore {
    public name = "formErrors"
    private errors: {[path: string]: IFormError | IFieldError | undefined} = {}

    public getPropKeys() { return ["errors"] }

    public setError(valuePath: string, value: any) {
      set(this.errors, valuePath, value)
      this.trigger(valuePath)
    }

    @autoSubscribe
    public getError(@key path: string): any {
      return get(this.errors, path)
    }
}

export default new FormErrorStore()
