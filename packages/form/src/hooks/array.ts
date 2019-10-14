import { isNumber } from "lodash"
import { action } from "mobx"
import { ExtendedJSONSchema } from "../jsonschema"
import FormStore from "../store/form"
import memo from "../util/memo"

const changeSize = (mapTo: string, prefix: any, isAdd: boolean, insertAt?: number) => {
  return memo(() => action((e: any) => {
    e.preventDefault()
    e.stopPropagation()
    const currentArray = FormStore.getValue(mapTo, prefix, [undefined])
    const length = currentArray.length
    if (!isNumber(insertAt)) {
      insertAt = length
    }
    if (isAdd) {
      currentArray.splice(Number(insertAt) + 1, 0, undefined)
    } else {
      currentArray.splice(insertAt, 1)
    }
    FormStore.setValue(mapTo, currentArray, prefix)
  }), ["changeSize", mapTo, prefix, isAdd, insertAt])
}
export interface IArrayfield  {
  mapTo: string
  prefix?: string
  schema: ExtendedJSONSchema
  increaseSize: () => void
  decreaseSize: () => void
}
/**
 * This hook is supposed to help rendering individual entries of an Array
 * the length of the array is tracked in a separate variable
 * so only the individual fields will be rerendered on change
 * @param mapTo key where the value of the field will be saved. uses lodash.get/set string syntax style so subfields, array indices etc. can be used within the string
 * @param prefix prepended to mapTo to allow same mapTo keys to have different values
 */
const useArrayHelper = (schema: ExtendedJSONSchema, mapTo?: string, prefix?: string) => {
  if (mapTo == null) {
    mapTo = schema.title
  }
  const length = FormStore.getValue(`${mapTo}.length`, prefix, 1)
  const fields: IArrayfield[] = []
  const subSchema: any = schema.items
  for (let i = 0; i < length; i++) {
    fields.push({
      mapTo: `${mapTo}[${i}]`,
      prefix,
      schema: Array.isArray(subSchema) ? subSchema[i] : subSchema,
      increaseSize: changeSize(String(mapTo), prefix, true, i),
      decreaseSize: changeSize(String(mapTo), prefix, false, i)
    })
  }
  return {
    /**
     * The current size of the array
     */
    length,
    /**
     * Increase the size of the array by one
     */
    increaseSize: changeSize(String(mapTo), prefix, true),
    /**
     * Decrease the size of the array by one
     */
    decreaseSize: changeSize(String(mapTo), prefix, false),
    /**
     * An array with the subfields for rendering
     */
    fields
  }
}

export default useArrayHelper
