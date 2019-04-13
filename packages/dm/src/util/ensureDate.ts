import { executeForMethods, ModifyFunction } from "@xpfw/form"
import { get, isString } from "lodash"
import * as momentA from "moment"
const moment: any = momentA

const ensureDate = (path: string, methods?: string[]) => {
  const dateEnsurer: ModifyFunction = executeForMethods((value) => {
    if (isString(value[path])) {
      const parsed: any = moment(value[path])
      if (parsed.isValid()) {
        value[path] = parsed.toDate()
      }
    }
    return Promise.resolve(value)
  }, methods)
  return dateEnsurer
}

export default ensureDate
