import { get, isNil, isObject, isString, set } from "lodash"
import { ObjectId } from "mongodb"

const converter = (id: any) => {
  let newVal
  if (isString(id)) {
    newVal = new ObjectId(id)
  } else if (Array.isArray(id)) {
    newVal = []
    for (const i of id) {
      newVal.push(new ObjectId(i))
    }
  }
  return newVal
}

const convertIds = (idPath: string, isFind: boolean) => {
  const getFrom = isFind ? "params.query" : "data"
  return (hook: any) => {
    const data = get(hook, getFrom)
    const id = get(data, idPath)
    if (!isNil(id)) {
      let newVal: any
      if (isObject(id) && !Array.isArray(id) && !isString(id)) {
        if (id.$nin) {
          newVal = {$nin: converter(id.$nin)}
        } else if (id.$in) {
          newVal = {$in: converter(id.$in)}
        }
      } else {
        newVal = converter(id)
      }
      set(hook, `${getFrom}.${idPath}`, newVal)
    }
    return hook
  }
}

export default convertIds
