import { ExtendedJSONSchema, FormStore, getMapTo, IFieldProps, memo, prependPrefix, useField, useFieldWithValidation } from "@xpfw/form"
import { cloneDeep, get, isArray, isNil, isNumber, isString, remove } from "lodash"
import { action } from "mobx"
import * as React from "react"
import dataOptions from "../options"
import DbStore from "../store/db"
import ListStore from "../store/list"

const lastUsedKey = "lastUsed"

const getListFormFromRelationshipField:
(schema: ExtendedJSONSchema, mapTo?: string) => ExtendedJSONSchema = (schema, mapTo) => {
  const collection = get(schema, "relationship.collection")
  const nameTransform: any = get(schema, "relationship.nameTransform", (schema: any, val: any) => {
    if (val == null || val.length === 0) {
      return null
    }
    return {
      $regex: `(.*?)${val}(.*?)`,
      $options: "isg"
    }
  })
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
      }
    },
    relationship: {
      nameTransform
    }
  }
}

const displayModeChanger = (mapTo: string, prefix?: string) => {
  return (newValue: any) => {
    FormStore.setValue(`displayMode.${mapTo}`, newValue, prefix)
  }
}

const addId = (schema: ExtendedJSONSchema, mapTo?: string, prefix?: string) => {
  if (mapTo == null) { mapTo = getMapTo(schema, mapTo) }
  const disp = displayModeChanger(mapTo, prefix)
  return action((newValue: any) => {
    if (schema.type === "array") {
      let currentValue = FormStore.getValue(mapTo, prefix)
      currentValue = !isArray(currentValue) ? [] : currentValue
      currentValue.push(newValue)
      FormStore.setValue(mapTo, currentValue, prefix)
      disp(0)
    } else {
      FormStore.setValue(mapTo, newValue, prefix)
    }
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
      let currentValue = FormStore.getValue(mapTo)
      currentValue = !Array.isArray(currentValue) ? [] : cloneDeep(currentValue)
      remove(currentValue, (val) => val === newValue)
      FormStore.setValue(mapTo, currentValue, prefix)
    } else {
      FormStore.setValue(mapTo, undefined, prefix)
    }
  })
}

const searchRelated = (schema: ExtendedJSONSchema, mapTo?: string, prefix?: string) => {
  if (mapTo == null) { mapTo = getMapTo(schema, mapTo) }
  return async (newValue: any) => {
    const form = getListFormFromRelationshipField(schema)
    const value = FormStore.getValue(mapTo, prefix)
    if (get(schema.relationship, "filterOutSelected", false) === true) {
      const f = useField(dataOptions.idPath, prependPrefix(mapTo, prefix))
      f.setValue({$nin: Array.isArray(value) ? value : [value]})
    }
    const nameField = useField(get(schema, "relationship.namePath"), prependPrefix(form.title, prefix))
    const transformer = get(form, "relationship.nameTransform")
    nameField.setValue(transformer(schema, newValue))
    const res: any = await ListStore.getList(form, undefined, prefix, true)
    if (get(schema.relationship, "autoSelect", false) === true) {
      if (!isNil(res) && Array.isArray(res.data) && res.data.length === 1) {
        addId(schema, mapTo, prefix)(get(res.data[0], dataOptions.idPath))
      }
    }
    return res
  }
}

// public componentDidUpdate() {
//   const prefix = this.props.prefix
//   const field: any = get(this, "props.field")
//   const form = getListFormFromRelationshipField(field)
//   const preppedPrefix = prefix && prefix.length > 0 ? prefix + "." : ""
//   const value = get(this, "props.value", "")
//   if (value.length > 0 && !isNil(form.sections[0].fields[1])) {
//     FormStore.setValue(preppedPrefix + field.mapTo + "." + form.sections[0].fields[1].mapTo,
//       {$nin: Array.isArray(value) ? value : [value]})
//   }
// }

const useRelationship = (schema: ExtendedJSONSchema, mapTo?: string, prefix?: string) => {
  if (mapTo == null) { mapTo = getMapTo(schema, mapTo) }
  const hookedField = useFieldWithValidation(schema, mapTo, prefix)
  const value: any = hookedField.value
  const collection: any = get(schema.relationship, "collection", "")
  // TODO: use prefix
  const displayMode = FormStore.getValue(`displayMode.${mapTo}`)
  let relatedObject: any
  const searchForm = getListFormFromRelationshipField(schema)
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
  // becausae autoSelect is the only relevant property in schema we only check against this instead of the stringifed schema for speed
  const autoSelect = get(schema.relationship, "autoSelect")
  return {
    value, setValue: hookedField.setValue, relatedObject, searchForm, displayMode, lastUsed,
    addId: memo(() => addId(schema, mapTo, prefix), ["addId", mapTo, prefix, autoSelect]), prefix,
    removeId: memo(() => removeId(schema, mapTo, prefix), ["removeId", mapTo, prefix, autoSelect]),
    searchRelated: memo(() => searchRelated(schema, mapTo, prefix), ["searchRelated", mapTo, prefix, autoSelect]),
    showDisplay: memo(() => displayModeChanger(String(mapTo), prefix)(1), ["showDisplay", mapTo, prefix]),
    hideDisplay: memo(() => displayModeChanger(String(mapTo), prefix)(0), ["hideDisplay", mapTo, prefix])
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
  addId, removeId, searchRelated, getListFormFromRelationshipField, useRelationshipWithProps, displayModeChanger
}
