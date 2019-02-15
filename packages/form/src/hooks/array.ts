import { isNumber, memoize } from "lodash-es"
import { action } from "mobx"
import FormStore from "../store/form"
import memo from "../util/memo"

const changeSize = (mapTo: string, prefix: any, isAdd: boolean, insertAt?: number) => {
  return memo(() => action(() => {
    const currentArray = FormStore.getValue(mapTo, prefix, [undefined])
    const length = currentArray.length
    if (!isNumber(insertAt)) {
      insertAt = length
    }
    if (isAdd) {
      currentArray.splice(insertAt, 0, undefined)
    } else {
      currentArray.splice(insertAt, 1)
    }
    FormStore.setValue(mapTo, currentArray, prefix)
  }), [mapTo, prefix, isAdd, insertAt])
}
export interface IArrayfield  {
  mapTo: string
  prefix?: string
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
const useArrayHelper = (mapTo: string, prefix?: string) => {
  const length = FormStore.getValue(`${mapTo}.length`, prefix, 1)
  const fields: IArrayfield[] = []
  for (let i = 0; i < length; i++) {
    fields.push({
      mapTo: `${mapTo}[${i}]`,
      prefix,
      increaseSize: changeSize(mapTo, prefix, true, i),
      decreaseSize: changeSize(mapTo, prefix, false, i)
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
    increaseSize: changeSize(mapTo, prefix, true),
    /**
     * Decrease the size of the array by one
     */
    decreaseSize: changeSize(mapTo, prefix, false),
    /**
     * An array with the subfields for rendering
     */
    fields
  }
}

export default useArrayHelper
