import { cloneDeep, indexOf, isArray } from "lodash"
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
  const newObj = cloneDeep(entry)
  if (newObj != null && newObj._id != null) {
    const id = ensureNoObjectId(newObj._id)
    let idIndex = indexOf(ids, id)
    if (idIndex === -1) {
      ids.push(id)
      idIndex = ids.length - 1
    }
    newObj._id = `ID#${idIndex}`
  }
  if (newObj != null && newObj.id != null) {
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
