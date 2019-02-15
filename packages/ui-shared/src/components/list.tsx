import { FormStore, LoadingStore } from "@xpfw/form-shared"
import { getFieldsFromForm,  IForm } from "@xpfw/validate"
import { get, isEqual, isNil, set } from "lodash"
import * as React from "react"
import { ComponentBase } from "resub"
import DbStore from "../store/db"
import ListStore from "../store/list"

export interface ISharedFormList extends React.Props<any> {
  prefix?: string
  form: IForm
  defaultEntries?: any[]
}

export interface ISharedFormListState {
  list?: any
  queryData?: any
  currentPage: number
  maxPage: number
  showNextPage: boolean
  showPrevPage: boolean
  loading: boolean
}

export type NextPage = () => Promise<any>

export interface IFormListProps extends ISharedFormList, ISharedFormListState {
  nextPage: NextPage
  prevPage: NextPage
}

const nextPage = (thisRef: {props: ISharedFormList}) => {
  return () => {
    return ListStore.nextPage(get(thisRef, "props.form"), get(thisRef, "props.prefix"))
  }
}

const prevPage = (thisRef: {props: ISharedFormList}) => {
  return () => {
    return ListStore.prevPage(get(thisRef, "props.form"), get(thisRef, "props.prefix"))
  }
}

const onUpdate = (thisRef: any) => {
  return () => {
    const form = get(thisRef, "props.form")
    const prefix = get(thisRef, "props.prefix")
    const queryObj = ListStore.buildQueryObj(form, prefix)
    const prev = thisRef.state.queryObj
    if (!isNil(queryObj)) {
      delete queryObj.$limit
      delete queryObj.$skip
    }
    if (!isNil(prev)) {
      delete prev.$limit
      delete prev.$skip
    }
    if (!isEqual(queryObj, prev)) {
      ListStore.resetPage(form, prefix)
      ListStore.makeQuery(form, prefix)
      thisRef.setState({queryObj})
    }
  }
}

function SharedFormList<T>(Component: React.ComponentType<IFormListProps & T>):
React.ComponentType<ISharedFormList & T> {
  return class extends ComponentBase<ISharedFormList & T, ISharedFormListState> {
    public nextPage: any
    public prevPage: any
    public constructor(props: ISharedFormList & T) {
      super(props)
      this.nextPage = nextPage(this)
      this.prevPage = prevPage(this)
      this.componentDidUpdate = onUpdate(this)
    }
    public render() {
      return (
        <Component
          {...this.props}
          {...this.state}
          nextPage={this.nextPage}
          prevPage={this.prevPage}
        />
      )
    }
    protected _buildState(props: ISharedFormList, initialBuild: boolean): ISharedFormListState {
      let prefix = get(props, "prefix", "")
      prefix = prefix && prefix.length > 0 ? prefix + "." : ""
      const getKey = `${prefix}${get(props, "form.model", "undefined")}`
      const loading = LoadingStore.getLoading(getKey)
      const currentPage = ListStore.getCurrentPage(getKey)
      const maxPage = ListStore.getMaxPage(getKey)
      // needed so componentDidUpdate gets triggered on form value change
      const queryData = {}
      for (const field of getFieldsFromForm(props.form)) {
        const val = `${prefix}${field.mapTo}`
        set(queryData, val, FormStore.getValue(val))
      }
      let list: any = ListStore.getList(getKey,
        get(props, "form"), get(props, "prefix", ""))
      if (isNil(list) || Array.isArray(list.result) && list.result.length === 0)  {
        if (Array.isArray(props.defaultEntries)) {
          const result = []
          for (const entry of props.defaultEntries) {
            const fetchRes = get(DbStore.getGetState(entry, get(props, "form.collection"), true), "result")
            if (!isNil(fetchRes)) {
              result.push(fetchRes)
            }
          }
          list = {result, total: 0, isDefaultList: true}
        }
      }
      return {
        list,
        loading,
        currentPage, maxPage,
        queryData,
        showNextPage: currentPage < maxPage - 1,
        showPrevPage: currentPage > 0
      }
    }
  }
}

export default SharedFormList
export {
  nextPage, prevPage, onUpdate
}
