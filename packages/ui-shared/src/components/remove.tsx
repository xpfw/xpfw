import { FormErrorStore, FormStore, LoadingStore } from "@xpfw/form-shared"
import { globals, IForm, IFormError } from "@xpfw/validate"
import { get } from "lodash"
import * as React from "react"
import { ComponentBase } from "resub"
import DbStore, { REMOVE_ADDON_KEY } from "../store/db"

export interface ISharedFormRemove extends React.Props<any> {
  id?: string
  form: IForm
}

export interface ISharedFormRemoveState {
  error?: IFormError
  state?: any
  loading: boolean
}

export type SubmitRemove = () => Promise<any>

export interface IFormRemoveProps extends ISharedFormRemove, ISharedFormRemoveState {
  submitRemove: SubmitRemove
}

const submitRemove = (thisRef: {props: ISharedFormRemove}) => {
  return async () => {
    return DbStore.remove(get(thisRef, "props.id"),
        get(thisRef, "props.form.collection"))
  }
}

function SharedFormRemove<T>(Component: React.ComponentType<IFormRemoveProps & T>):
React.ComponentType<ISharedFormRemove & T> {
  return class extends ComponentBase<ISharedFormRemove & T, ISharedFormRemoveState> {
    public submitRemove: SubmitRemove
    public constructor(props: ISharedFormRemove & T) {
      super(props)
      this.submitRemove = submitRemove(this)
    }
    public render() {
      return (
        <Component
          {...this.props}
          {...this.state}
          submitRemove={this.submitRemove}
        />
      )
    }
    protected _buildState(props: ISharedFormRemove, initialBuild: boolean): ISharedFormRemoveState {
      const id: any = get(props, "id", "_")
      return {
        state: DbStore.getRemoveState(id),
        loading: LoadingStore.getLoading(REMOVE_ADDON_KEY + id)
      }
    }
  }
}

export default SharedFormRemove
export {
  submitRemove
}
