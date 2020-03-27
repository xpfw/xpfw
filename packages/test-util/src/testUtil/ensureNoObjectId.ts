import { isFunction } from "lodash"

const ensureNoObjectId: (id: any) => any = (id) => {
  if (id != null && isFunction(id.toHexString)) {
    return id.toHexString()
  }
  return id
}

export default ensureNoObjectId
