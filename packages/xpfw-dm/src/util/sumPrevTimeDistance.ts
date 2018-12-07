import { get, isDate } from "lodash"
import { NumberCalculator } from "../typeDef"
import getDate from "./getDate"

/**
 * Calculates the sum of itemPath value for items in
 * If nothing is set returns the sum of iterated items
 * @param config Set itemPath of the number you want the sum of
 */
const sumPrevTimeDistance: NumberCalculator = (config) => {
  const pathToGet: any = get(config, "itemPath", false)
  let total: any = 0
  let prev: any = null
  return (obj) => {
    const prevObjDate = getDate(prev, pathToGet)
    const prevIsValid = isDate(prevObjDate)
    if (pathToGet) {
      if (prevIsValid) {
        const objDate = getDate(obj, pathToGet)
        if (isDate(objDate)) {
          total += Math.abs(prevObjDate.getTime() - objDate.getTime())
        }
      }
    }
    prev = obj
    return Promise.resolve(total)
  }
}

export default sumPrevTimeDistance
