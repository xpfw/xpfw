import { isFunction, isObject } from "lodash"

const ensureNoObjectId: (id: any) => any = (id) => {
  if (isObject(id) && isFunction(id.toHexString)) {
    return id.toHexString()
  }
  return id
}

export default ensureNoObjectId
