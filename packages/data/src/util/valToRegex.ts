import { executeForMethods } from "@xpfw/form"
import { get, set } from "lodash"

const valToRegex = (val: any) => {
  if (val == null || val.length === 0) {
    return undefined
  }
  return {
    $regex: `(.*?)${val}(.*?)`,
    $options: "isg"
  }
}

const changeValToRegex = (path: string, methods?: string[]) => {
  return executeForMethods((value: any) => {
    const v = get(value, path)
    if (v != null) {
      set(value, path, valToRegex(v))
    }
    return Promise.resolve(value)
  }, methods)
}

export default valToRegex
export {
  changeValToRegex
}
