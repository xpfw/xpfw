import { cloneDeep } from "lodash"

const valToRegex = (val: any) => {
  if (val == null || val.length === 0) {
    return undefined
  }
  return {
    $regex: new RegExp(`(.*?)${val}(.*?)`, "ig")
  }
}

const changeValToRegex = (path: string) => {
  return (value: any) => {
    if (value[path] != null) {
      const newValue = cloneDeep(value)
      newValue[path] = valToRegex(newValue[path])
      return newValue
    }
    return value
  }
}

export default valToRegex
export {
  changeValToRegex
}
