import { isNil } from "lodash"
import moment from "moment"
const momentA: any = moment
const timeStepMaker = (min: any, max: any, diffUnit: string, endOfUnit: string, format: string) => {
  let amountOfDays
  let i: any
  let j: any
  let newMin: any
  let ref: any
  const timeSteps: any = {}
  amountOfDays = min.diff(max, diffUnit)
  for (i = j = 0, ref = amountOfDays; ref >= 0 ? j <= ref : j >= ref; i = ref >= 0 ? ++j : --j) {
    newMin = momentA(max.toDate()).add(i, diffUnit)
    timeSteps[newMin.format(format)] = {
      start: newMin.startOf(endOfUnit).toDate(),
      end: newMin.endOf(endOfUnit).toDate()
    }
  }
  return timeSteps
}

const getTimeSteps = (gte: string | Date, lte?: string | Date) => {
  let max
  let min
  let timeSteps
  if (isNil(lte)) {
    lte = momentA().startOf(`day`).toDate()
  }
  min = momentA(lte)
  max = momentA(gte)
  if (min.diff(max, `months`) > 12) {
    timeSteps = timeStepMaker(min, max, `years`, `year`, `YYYY`)
  } else if (min.diff(max, `months`) <= 12 && min.diff(max, `months`) > 1) {
    timeSteps = timeStepMaker(min, max, `months`, `month`, `MM.YYYY`)
  } else {
    timeSteps = timeStepMaker(min, max, `days`, `day`, `DD.MM`)
  }
  return timeSteps
}

export default getTimeSteps
