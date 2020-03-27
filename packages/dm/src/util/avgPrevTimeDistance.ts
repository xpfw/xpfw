import { get, isDate } from "lodash"
import { CompareNumberCalculator } from "../typeDef"
import getDate from "./getDate"

/**
 * Calculates the sum of itemPath value for items in
 * If nothing is set returns the sum of iterated items
 * @param config Set itemPath of the number you want the sum of
 */
const avgPrevTimeDistance: CompareNumberCalculator = (config) => {
  const pathToGet: any = get(config, "itemPath", false)
  let total: any = 0
  let amt = 0
  let prev: any = null
  return (obj) => {
    const prevObjDate = getDate(prev, pathToGet)
    const prevIsValid = isDate(prevObjDate)
    if (pathToGet) {
      if (prevIsValid) {
        const objDate = getDate(obj, pathToGet)
        if (isDate(objDate)) {
          total += Math.abs(prevObjDate.getTime() - objDate.getTime())
          amt++
        }
      }
    }
    prev = obj
    if (total === 0) {
      return Promise.resolve(0)
    }
    return Promise.resolve(total / amt)
  }
}

export default avgPrevTimeDistance
