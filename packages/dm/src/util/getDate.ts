import { get, isString } from "lodash"
import momentA from "moment"
const moment: any = momentA

const getDate = (value: any, path: string, defaultVal?: any) => {
  const val: any = get(value, path, defaultVal)
  if (isString(val)) {
    const parsed: any = moment(val)
    if (parsed.isValid()) {
      return parsed.toDate()
    }
  }
  return val
}

export default getDate
