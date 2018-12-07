import { get, isNumber } from "lodash"
import { NumberCalculator } from "../typeDef"

/**
 * Calculates the mean of itemPath value
 * If nothing is set returns the sum of iterated items
 * @param config Set itemPath of the number you want the mean of
 */
const mean: NumberCalculator = (config) => {
  const pathToGet: any = get(config, "itemPath", false)
  let result = 0
  let total = 0
  return (obj) => {
    if (pathToGet) {
      total++
      const objNum = get(obj, pathToGet, 0)
      if (isNumber(objNum) && !isNaN(objNum)) {
        result += objNum
      }
      return Promise.resolve(result / total)
    }
    result++
    return Promise.resolve(result)
  }
}

export default mean
