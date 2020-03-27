import { get, isNumber } from "lodash"
import { NumberCalculator } from "../typeDef"

/**
 * Calculates the sum of itemPath value
 * If nothing is set returns the sum of iterated items
 * @param config Set itemPath of the number you want the sum of
 */
const sum: NumberCalculator = (config) => {
  const pathToGet: any = get(config, "itemPath", false)
  let total = 0
  return (obj) => {
    if (pathToGet) {
      const objNum = get(obj, pathToGet, 0)
      if (isNumber(objNum) && !isNaN(objNum)) {
        total += objNum
      }
      return Promise.resolve(total)
    }
    total++
    return Promise.resolve(total)
  }
}

export default sum
