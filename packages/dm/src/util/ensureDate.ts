import { get, isString } from "lodash"
import * as momentA from "moment"
const moment: any = momentA

const ensureDate = (val: any) => {
  if (isString(val)) {
    const parsed: any = moment(val)
    if (parsed.isValid()) {
      return parsed.toDate()
    }
  }
  return val
}

export default ensureDate
