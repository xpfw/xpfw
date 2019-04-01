import { executeForMethods } from "@xpfw/form"

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
    if (value[path] != null) {
      value[path] = valToRegex(value[path])
    }
    return Promise.resolve(value)
  }, methods)
}

export default valToRegex
export {
  changeValToRegex
}
