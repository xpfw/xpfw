import { get, isNil, isNumber, isString } from "lodash"
import { NumberCalculator } from "../typeDef"

/**
 * Calculates the sum of itemPath value
 * If nothing is set returns the sum of iterated items
 * @param config Set itemPath of the number you want the sum of
 */
const categorize: NumberCalculator = (config) => {
  const pathToGet: any = get(config, "itemPath", "false")
  let total = 0
  const categories = {}
  return (obj) => {
    let value = get(obj, pathToGet)
    if (!Array.isArray(value)) {
      value = [value]
    }
    for (const val of value) {
      if (isString(val)) {
        if (isNil(categories[val])) {
          categories[val] = 0
        }
        categories[val] += 1
        total += 1
      }
    }
    return Promise.resolve({total, categories})
  }
}

export default categorize
