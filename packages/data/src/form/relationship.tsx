import { FormStore, IFieldProps } from "@xpfw/form-shared"
import ValidationRegistry, { fieldConverter, globals, IField, IFieldError, IForm, options } from "@xpfw/validate"
import { prefixMaker } from "@xpfw/validate"
import { cloneDeep, get, isArray, isNil, isNumber, isString, remove } from "lodash"
import * as React from "react"
import { ComponentBase } from "resub"
import DbStore from "../store/db"
import ListStore from "../store/list"

export interface ISharedRelationshipField extends IFieldProps {
}

export interface ISharedRelationshipFieldState {
  relatedObject?: any
  displayMode: any
  searchForm: IForm
  lastUsed?: any[]
  error?: IFieldError
}

export interface ISharedRelationshipFieldProps extends ISharedRelationshipField, ISharedRelationshipFieldState {
  addId: (id: string) => any
  removeId: (id: string) => any
  setDisplayMode: (id: any) => any
}

const lastUsedKey = "lastUsed"

const getListFormFromRelationshipField: (field: IField) => IForm = (field: IField) => {
  const collection = get(field, "validate.relationshipCollection")
  const nameSearchField: IField = {
    mapTo: get(field, "validate.relationshipNamePath"),
    type: globals.FieldType.Text,
    validate: {
      convert: fieldConverter.textRegex
    }
  }
  const fields = [nameSearchField]
  if (!isNil(ValidationRegistry.forms[collection]) &&
  get(ValidationRegistry.forms[collection], "options.filterOutById", false)) {
    fields.push({
      mapTo: get(ValidationRegistry.forms[collection], "options.idPath", "id"),
      type: globals.FieldType.Text,
      validate: {
        type: globals.FieldType.Text
      }
    })
  }
  return {
    model: "searchFor." + field.mapTo,
    collection,
    sections: [
      {fields}
    ]
  }
}
const displayModeChanger = (thisRef: {props: ISharedRelationshipField}) => {
  return (newValue: any) => {
    const mapTo: any = get(thisRef, "props.field.mapTo", "unknownRelation")
    FormStore.setValue(`displayMode.${mapTo}`, newValue)
  }
}

const addId = (thisRef: {props: ISharedRelationshipField}) => {
  const disp = displayModeChanger(thisRef)
  return async (newValue: any) => {
    const prefix = prefixMaker(thisRef.props.prefix)
    const mapTo = get(thisRef, "props.field.mapTo", "undefined")
    const valuePath = `${prefix}${mapTo}`
    if (get(thisRef, "props.field.type") === globals.FieldType.RelationshipMulti) {
      let currentValue = FormStore.getValue(valuePath)
      currentValue = !isArray(currentValue) ? [] : cloneDeep(currentValue)
      currentValue.push(newValue)
      FormStore.setValue(valuePath, currentValue)
      disp(0)
    } else {
      FormStore.setValue(valuePath, newValue)
    }
    const lastUsedFieldKey = `${lastUsedKey}.${prefix}${mapTo}`
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
  }
}

const removeId = (thisRef: {props: ISharedRelationshipField}) => {
  return async (newValue: any) => {
    let prefix = get(thisRef.props, "prefix", "")
    prefix = prefix && prefix.length > 0 ? prefix + "." : ""
    const valuePath = `${prefix}${get(thisRef, "props.field.mapTo", "undefined")}`
    if (get(thisRef, "props.field.type") === globals.FieldType.RelationshipMulti) {
      let currentValue = FormStore.getValue(valuePath)
      currentValue = !isArray(currentValue) ? [] : cloneDeep(currentValue)
      remove(currentValue, (val) => val === newValue)
      FormStore.setValue(valuePath, currentValue)
    } else {
      FormStore.setValue(valuePath, undefined)
    }
  }
}

const searchRelated = (thisRef: {props: ISharedRelationshipField}) => {
  return async (newValue: any) => {
    const field: any = get(thisRef, "props.field")
    const form = getListFormFromRelationshipField(field)
    const prefix = get(thisRef.props, "prefix", "")
    const preppedPrefix = prefix && prefix.length > 0 ? prefix + "." : ""
    const value = get(thisRef, "props.value", "")
    if (value.length > 0 && !isNil(form.sections[0].fields[1])) {
      FormStore.setValue(preppedPrefix + form.sections[0].fields[1].mapTo,
        {$nin: Array.isArray(value) ? value : [value]})
    }
    FormStore.setValue(preppedPrefix + form.sections[0].fields[0].mapTo, newValue)
    const res: any = await ListStore.getList(`${preppedPrefix}${form.model}`, form, prefix, true)
    if (FormStore.getValue(options.relationshipAutoSelect) === true) {
      if (!isNil(res) && Array.isArray(res.result) && res.result.length === 1) {
        const collection = get(field, "validate.relationshipCollection")
        addId(thisRef)(get(res.result[0], get(ValidationRegistry.forms[collection], "options.idPath", "id")))
      }
    }
    return res
  }
}

function RelationShipWrapper<T>(Component: React.ComponentType<ISharedRelationshipFieldProps & T>):
React.ComponentType<ISharedRelationshipField & T> {
  const bla: React.ComponentType<ISharedRelationshipField & T> =
  class SharedRelationshipField extends ComponentBase<ISharedRelationshipField & T, ISharedRelationshipFieldState> {
    public searchRelated: any
    public addId: any
    public removeId: any
    public setDisplayMode: any
    public constructor(props: ISharedRelationshipField & T) {
      super(props)
      this.searchRelated = searchRelated(this)
      this.addId = addId(this)
      this.removeId = removeId(this)
      this.setDisplayMode = displayModeChanger(this)
    }
    public componentDidUpdate() {
      const prefix = this.props.prefix
      const field: any = get(this, "props.field")
      const form = getListFormFromRelationshipField(field)
      const preppedPrefix = prefix && prefix.length > 0 ? prefix + "." : ""
      const value = get(this, "props.value", "")
      if (value.length > 0 && !isNil(form.sections[0].fields[1])) {
        FormStore.setValue(preppedPrefix + field.mapTo + "." + form.sections[0].fields[1].mapTo,
          {$nin: Array.isArray(value) ? value : [value]})
      }
    }
    public render() {
      return (
        <Component
          {...this.props}
          {...this.state}
          addId={this.addId}
          removeId={this.removeId}
          setDisplayMode={this.setDisplayMode}
        />
      )
    }
    protected _buildState(props: ISharedRelationshipField, initialBuild: boolean): ISharedRelationshipFieldState {
      const contents = get(props, "value", -1)
      const collection = get(props, "field.validate.relationshipCollection")
      // TODO: use prefix
      const mapTo = get(props, "field.mapTo", `unknownRelation`)
      const displayMode = FormStore.getValue(`displayMode.${mapTo}`)
      let relatedObject: any
      const searchForm = getListFormFromRelationshipField(props.field)
      if (isArray(contents)) {
        relatedObject = []
        for (const id of contents) {
          if (!isNil(id)) {
            relatedObject.push(get(DbStore.get(id, collection, false), "result"))
          }
        }
      } else if (isNumber(contents) || isString(contents) && contents.length > 0) {
        const arg: any = contents
        relatedObject = get(DbStore.get(arg, collection, false), "result")
      }
      const lastUsed = FormStore.getValue(`${lastUsedKey}.${prefixMaker(props.prefix)}${mapTo}`)
      return {relatedObject, searchForm, displayMode, lastUsed}
    }
  }
  return bla
}

export default RelationShipWrapper
export {
  addId, removeId, searchRelated, getListFormFromRelationshipField
}
