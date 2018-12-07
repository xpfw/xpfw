import {  StatType } from "@xpfw/validate"
import { get, isNumber } from "lodash"
import statTypes from "../statTypes"
import { TimeStepCalculator } from "../typeDef"
import getDate from "./getDate"
import getTimeSteps from "./getTimesteps"
import { getTimeStepPath, initResultObject } from "./timestepUtil"

/**
 * Calculates the sum of itemPath value for items in
 * If nothing is set returns the sum of iterated items
 * @param config Set itemPath of the number you want the sum of
 */
const timeStep: TimeStepCalculator = (config) => {
  const subCalcType: any = get(config, "subType", StatType.sum)
  const subCalcMaker: any = get(statTypes, subCalcType)
  const datePath: any = get(config, "datePath", "createdAt")
  const timeSteps: any = get(config, "timeSteps", getTimeSteps(new Date()))
  const result: any = initResultObject(timeSteps, 0)
  const subCalcs: any = initResultObject(timeSteps, () => subCalcMaker((get(config, "subConfig", {}))))
  const defaultDate = new Date()
  return async (obj) => {
    const timestepPath = getTimeStepPath(timeSteps, getDate(obj, datePath, defaultDate))
    if (timestepPath.length > 0) {
      result[timestepPath] = await subCalcs[timestepPath](obj)
    }
    return result
  }
}

export default timeStep
