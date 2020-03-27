import { ExtendedJSONSchema, FormStore, getMapTo, memo, prependPrefix, useFieldWithValidation } from "@xpfw/form"
import { cloneDeep, get, isArray, isNil, isNumber, isString, remove } from "lodash"
import { action } from "mobx"
import dataOptions from "../options"
import DbStore from "../store/db"
import ListStore from "../store/list"
import { changeValToRegex } from "../util/valToRegex"

const lastUsedKey = "lastUsed"

const getListFormFromRelationshipField:
(schema: ExtendedJSONSchema, mapTo?: string) => ExtendedJSONSchema = (schema, mapTo) => {
  const collection = get(schema, "relationship.collection")
  const searchProperties = get(schema, "relationship.searchProperties", {})
  const nameSearchField: ExtendedJSONSchema = {
    title: get(schema, "relationship.namePath"),
    type: "string"
  }
  return {
    title: "searchFor." + getMapTo(schema, mapTo),
    collection,
    properties: {
      [String(nameSearchField.title)]: nameSearchField,
      [dataOptions.idPath]: {
        title: dataOptions.idPath,
        type: "string"
      },
      ...searchProperties
    },
    modify: schema.modify ? schema.modify : changeValToRegex(get(schema, "relationship.namePath"), ["find"]),
    nameSearchField
  }
}

const displayModeChanger = (mapTo: string, prefix?: string, newValue?: any) => {
  return () => {
    FormStore.setValue(`displayMode.${prependPrefix(mapTo, prefix)}`, newValue)
  }
}

const addId = (schema: ExtendedJSONSchema, mapTo?: string, prefix?: string) => {
  if (mapTo == null) { mapTo = getMapTo(schema, mapTo) }
  const disp = displayModeChanger(mapTo, prefix, false)
  return action((newValue: any) => {
    if (schema.type === "array") {
      let currentValue = FormStore.getValue(mapTo, prefix)
      currentValue = !isArray(currentValue) ? [] : currentValue
      currentValue.push(newValue)
      FormStore.setValue(mapTo, currentValue, prefix)
    } else {
      FormStore.setValue(mapTo, newValue, prefix)
    }
    disp()
    const lastUsedFieldKey = `${lastUsedKey}.${prependPrefix(mapTo, prefix)}`
    let lastUsed = FormStore.getValue(lastUsedFieldKey)
    if (!Array.isArray(lastUsed)) {
      lastUsed = []
    }
    const indexOfLastUsed = lastUsed.indexOf(newValue)
    if (indexOfLastUsed !== -1) {
      lastUsed.splice(indexOfLastUsed, 1)
    }
    lastUsed.unshift(newValue)
    if (lastUsed.length > ListStore.pageSize) {
      lastUsed.splice(1)
    }
    FormStore.setValue(lastUsedFieldKey, lastUsed)
  })
}

const removeId = (schema: ExtendedJSONSchema, mapTo?: string, prefix?: string) => {
  if (mapTo == null) { mapTo = getMapTo(schema, mapTo) }
  return action((newValue: any) => {
    if (schema.type === "array") {
      let currentValue = FormStore.getValue(mapTo, prefix)
      currentValue = !Array.isArray(currentValue) ? [] : cloneDeep(currentValue)
      remove(currentValue, (val) => val === newValue)
      FormStore.setValue(mapTo, currentValue, prefix)
    } else {
      FormStore.setValue(mapTo, undefined, prefix)
    }
  })
}

const useRelationship = (schema: ExtendedJSONSchema, mapTo?: string, prefix?: string) => {
  if (mapTo == null) { mapTo = getMapTo(schema, mapTo) }
  const hookedField = useFieldWithValidation(schema, mapTo, prefix)
  const value: any = hookedField.value
  const collection: any = get(schema.relationship, "collection", "")
  // TODO: use prefix
  const displayMode = FormStore.getValue(`displayMode.${prependPrefix(mapTo, prefix)}`)
  let relatedObject: any
  const searchForm = getListFormFromRelationshipField(schema)
  if (get(schema, "relationship.filterOutSelected", false)) {
    const filterIds = get(schema, "relationship.filterIds", [])
    const toFilter = filterIds.concat(Array.isArray(value) ? value : [value])
    FormStore.setValue(dataOptions.idPath,
      {$nin: toFilter}, prependPrefix(searchForm.title, prependPrefix(prefix, "search")))
  }
  if (isArray(value)) {
    relatedObject = []
    for (const id of value) {
      if (!isNil(id)) {
        relatedObject.push(DbStore.get(id, collection, false))
      }
    }
  } else if (isNumber(value) || isString(value) && value.length > 0) {
    const arg: any = value
    relatedObject = DbStore.get(arg, collection, false)
  }
  const lastUsed = FormStore.getValue(`${lastUsedKey}.${prependPrefix(mapTo, prefix)}`)
  // TODO: fix autoselect
  // TODO: fix filter existing
  // becausae autoSelect is the only relevant property in schema we only check against this instead of the stringifed schema for speed
  const autoSelect = get(schema.relationship, "autoSelect")
  return {
    value, setValue: hookedField.setValue, relatedObject, searchForm, displayMode, lastUsed,
    addId: memo(() => addId(schema, mapTo, prefix), ["addId", mapTo, prefix, autoSelect]), prefix,
    removeId: memo(() => removeId(schema, mapTo, prefix), ["removeId", mapTo, prefix, autoSelect]),
    showDisplay: memo(() => displayModeChanger(String(mapTo), prefix, true), ["showDisplay", mapTo, prefix]),
    hideDisplay: memo(() => displayModeChanger(String(mapTo), prefix, false), ["hideDisplay", mapTo, prefix])
  }
}

export interface IRelationshipHookProps {
  schema: ExtendedJSONSchema
  mapTo?: string
  prefix?: string
}

const useRelationshipWithProps = (props: IRelationshipHookProps) => useRelationship(props.schema, props.mapTo, props.prefix)

export default useRelationship
export {
  addId, removeId, getListFormFromRelationshipField, useRelationshipWithProps, displayModeChanger
}
