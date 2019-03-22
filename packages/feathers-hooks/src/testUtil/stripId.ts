import { cloneDeep, indexOf, isArray, isNil, isObject } from "lodash"
import ensureNoObjectId from "./ensureNoObjectId"
const ids: string[] = []

const stripArray = (entry: any): any => {
  const newArr = []
  for (const e of entry) {
    newArr.push(stripId(e))
  }
  return newArr
}

const stripId = (entry: any) => {
  if (isArray(entry)) {
    return stripArray(entry)
  }
  if (isArray(entry.data)) {
    entry.data = stripId(entry.data)
    return entry
  }
  const newObj = cloneDeep(entry)
  if (isObject(newObj) && !isNil(newObj._id)) {
    const id = ensureNoObjectId(newObj._id)
    let idIndex = indexOf(ids, id)
    if (idIndex === -1) {
      ids.push(id)
      idIndex = ids.length - 1
    }
    newObj._id = `ID#${idIndex}`
  }
  if (isObject(newObj) && !isNil(newObj.id)) {
    const id = ensureNoObjectId(newObj.id)
    let idIndex = indexOf(ids, id)
    if (idIndex === -1) {
      ids.push(id)
      idIndex = ids.length - 1
    }
    newObj.id = `ID#${idIndex}`
  }
  return newObj
}

export default stripId
