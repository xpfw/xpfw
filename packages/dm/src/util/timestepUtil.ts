import { get, isDate, isFunction, isNil } from "lodash"
import * as moment from "moment"

const momentA: any = moment

const initResultObject = (timeSteps: any, initWith: any = 0) => {
  const res: any = {}
  for (const step in timeSteps) {
    if (isFunction(initWith)) {
      res[step] = initWith(step)
    } else {
      res[step] = initWith
    }
  }
  return res
}

const getTimeStepPath = (timeSteps: any, date: Date) => {
  let path = ""
  if (isDate(date)) {
    for (const timeStep in timeSteps) {
      let needsToBe = 0
      let got = 0
      const lte = get(timeSteps[timeStep], "end")
      if (!isNil(lte)) {
        needsToBe++
        if (date.getTime() - momentA(lte).toDate().getTime() <= 0) {
          got++
        }
      }
      const gte = get(timeSteps[timeStep], "start")
      if (!isNil(gte)) {
        needsToBe++
        if (date.getTime() - momentA(gte).toDate().getTime() >= 0) {
          got++
        }
      }
      if (got > 0 && needsToBe === got) {
        path = timeStep
      }
    }
  }
  return path
}

export {
  initResultObject, getTimeStepPath
}
