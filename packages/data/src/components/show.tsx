import { LoadingStore } from "@xpfw/form-shared"
import { get } from "lodash"
import * as React from "react"
import { ComponentBase } from "resub"
import DbStore, { IResult } from "../store/db"

export interface ISharedFormShow extends React.Props<any> {
  collection?: string
  id?: string
}

export interface ISharedFormShowState {
  item?: IResult
  loading: boolean
}

export interface IFormShowProps extends ISharedFormShow, ISharedFormShowState {
}

function SharedFormShow<T>(Component: React.ComponentType<IFormShowProps & T>):
React.ComponentType<ISharedFormShow & T> {
  return class extends ComponentBase<ISharedFormShow & T, ISharedFormShowState> {
    public render() {
      return <Component {...this.props} {...this.state} />
    }
    protected _buildState(props: ISharedFormShow, initialBuild: boolean): ISharedFormShowState {
      const id: any = get(props, "id", "none")
      const collection: any = get(props, "collection", "none")
      const loading = LoadingStore.getLoading(id)
      return {
        item: get(DbStore.getGetState(id, collection, true), "result"),
        loading
      }
    }
  }
}

export default SharedFormShow
