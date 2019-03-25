import { get, isDate } from "lodash"
import { CompareNumberCalculator } from "../typeDef"
import getDate from "./getDate"

/**
 * Calculates the sum of itemPath value for items in
 * If nothing is set returns the sum of iterated items
 * @param config Set itemPath of the number you want the sum of
 */
const avgTimeDistance: CompareNumberCalculator = (config) => {
  const pathToGet: any = get(config, "itemPath", false)
  const secondPathGet: any = get(config, "compareWithPath", false)
  let total: any = 0
  let amt = 0
  return (obj) => {
    const prevObjDate = getDate(obj, secondPathGet)
    if (pathToGet) {
      if (isDate(prevObjDate)) {
        const objDate = getDate(obj, pathToGet)
        if (isDate(objDate)) {
          total += Math.abs(prevObjDate.getTime() - objDate.getTime())
          amt++
        }
      }
    }
    if (total === 0) {
      return Promise.resolve(0)
    }
    return Promise.resolve(total / amt)
  }
}

export default avgTimeDistance
