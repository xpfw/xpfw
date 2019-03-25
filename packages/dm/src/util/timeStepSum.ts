import { get, isNumber } from "lodash"
import { TimeStepCalculator } from "../typeDef"
import getTimeSteps from "./getTimesteps"
import { getTimeStepPath, initResultObject } from "./timestepUtil"

/**
 * Calculates the sum of itemPath value for items in
 * If nothing is set returns the sum of iterated items
 * @param config Set itemPath of the number you want the sum of
 */
const timeStepSum: TimeStepCalculator = (config) => {
  const pathToGet: any = get(config, "itemPath", false)
  const datePath: any = get(config, "datePath", "createdAt")
  const timeSteps: any = get(config, "timeSteps", getTimeSteps(new Date()))
  const total: any = initResultObject(timeSteps, 0)
  const defaultDate = new Date()
  return (obj) => {
    const timestepPath = getTimeStepPath(timeSteps, get(obj, datePath, defaultDate))
    if (timestepPath.length > 0) {
      if (pathToGet) {
        const objNum = get(obj, pathToGet, 0)
        if (isNumber(objNum) && !isNaN(objNum)) {
          total[timestepPath] += objNum
        }
        return Promise.resolve(total)
      }
      total[timestepPath]++
      return Promise.resolve(total)
    }
    return Promise.resolve(total)
  }
}

export default timeStepSum
