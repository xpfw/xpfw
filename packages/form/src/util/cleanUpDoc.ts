import { get, isBoolean, isNil, isObject, set, startsWith } from "lodash"

const cleanUpDoc: (filterHelper?: any, doc?: any, setFlat?: boolean) => any =
(filterHelper, doc, setFlat) => {
  setFlat = isBoolean(setFlat) ? setFlat : false
  if (isNil(doc) || isNil(filterHelper)) {
    return null
  }
  const newDoc: any = {}
  for (const key in filterHelper) {
    const val = get(doc, key)
    if (!isNil(val)) {
      if (setFlat) {
        newDoc[key] = val
      } else {
        set(newDoc, key, val)
      }
    }
  }
  return newDoc
}

export default cleanUpDoc
