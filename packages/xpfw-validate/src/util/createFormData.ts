import { each, get, isNil, isObject, isString, set } from "lodash"
import { IField } from "../typeDef"

export interface ISetDef {field: IField, value: any}
export type ObjectDef = ISetDef[]

const createFormData: (dataDef: ObjectDef, options?: {
  mapTo?: string
}) => object = (dataDef, options) => {
  const createdObject = {}
  const getToSetFrom = (!isNil(options) && isString(options.mapTo)) ? options.mapTo : `mapTo`
  each(dataDef, (setDef) => {
    const toSet = get(setDef.field, getToSetFrom)
    set(createdObject, toSet, setDef.value)
  })
  return createdObject
}

export default createFormData
