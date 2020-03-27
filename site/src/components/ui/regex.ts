import { executeForMethods } from "@xpfw/form"
import { cloneDeep } from "lodash"

const valToRegex = (val: any) => {
  if (val == null || val.length === 0) {
    return undefined
  }
  return {
    $regex: new RegExp(`(.*?)${val}(.*?)`, "ig")
  }
}

const changeValToRegex = (path: string, methods?: string[]) => {
  return executeForMethods((value: any) => {
    if (value[path] != null) {
      value[path] = valToRegex(value[path])
    }
    return Promise.resolve(value)
  })
}

export default valToRegex
export {
  changeValToRegex
}
