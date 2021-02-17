import { executeForMethods, ModifyFunction } from "@xpfw/form"
import { get,isString, set } from "lodash"
import momentA from "moment"
const moment: any = momentA

const ensureDate = (path: string, methods?: string[]) => {
  const dateEnsurer: ModifyFunction = executeForMethods((value) => {
    const val = get(value, path)
    if (isString(val)) {
      const parsed: any = moment(val)
      if (parsed.isValid()) {
        set(value, path, parsed.toDate())
      }
    }
    return Promise.resolve(value)
  }, methods)
  return dateEnsurer
}

export default ensureDate
