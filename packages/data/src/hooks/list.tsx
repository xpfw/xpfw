import { ExtendedJSONSchema, FormStore, getMapTo, prependPrefix } from "@xpfw/form"
import { get, isNil } from "lodash"
import { useEffect, useState } from "react"
import DbStore from "../store/db"
import ListStore from "../store/list"
import { action } from "mobx";

const nextPage = (schema: ExtendedJSONSchema, mapTo?: string, prefix?: string) => {
  return () => {
    return ListStore.nextPage(schema, mapTo, prefix)
  }
}

const prevPage = (schema: ExtendedJSONSchema, mapTo?: string, prefix?: string) => {
  return () => {
    return ListStore.prevPage(schema, mapTo, prefix)
  }
}

export interface IListOptions {
  defaultEntries?: any[]
}

export interface IListHookProps {
  schema: ExtendedJSONSchema
  mapTo?: string
  prefix?: string
  options?: IListOptions
}

const useList = (schema: ExtendedJSONSchema, mapTo?: string, prefix?: string, options?: IListOptions) => {
  const queryObj = ListStore.buildQueryObj(schema, mapTo, prefix, true)
  useEffect(() => {
    setTimeout(action(() => {
      ListStore.resetPage(schema, mapTo, prefix)
      ListStore.makeQuery(schema, mapTo, prefix)
    }), 1)
  }, [JSON.stringify(queryObj)])
  if (mapTo == null) {
    mapTo = getMapTo(schema, mapTo)
  }
  const getKey = prependPrefix(mapTo, prefix)
  const loading = FormStore.getLoading(getKey)
  const currentPage = ListStore.getCurrentPage(getKey)
  const maxPage = ListStore.getMaxPage(getKey)
  // needed so componentDidUpdate gets triggered on form value change
  let list: any = ListStore.getList(schema, mapTo, prefix)
  if (isNil(list) || Array.isArray(list.data) && list.data.length === 0)  {
    if (options != null && Array.isArray(options.defaultEntries)) {
      const data = []
      for (const entry of options.defaultEntries) {
        const fetchRes = DbStore.getGetState(entry, String(schema.collection), true)
        if (!isNil(fetchRes)) {
          data.push(fetchRes)
        }
      }
      list = {data, total: 0, isDefaultList: true}
    }
  }
  return {
    list,
    loading,
    currentPage, maxPage,
    queryData: queryObj,
    showNextPage: currentPage < maxPage - 1,
    showPrevPage: currentPage > 0
  }
}

const useListWithProps = (props: IListHookProps) => useList(props.schema, props.mapTo, props.prefix, props.options)

export default useList
export {
  nextPage, prevPage, useListWithProps
}
