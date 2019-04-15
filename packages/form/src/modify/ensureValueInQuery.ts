import {
  intersection, keys, set
} from "lodash"

const arrayWithSubFieldsOperators = ["$or", "$and"]

/**
 * This function Was written to be used in feathers hooks to ensure the current user ID is set in a query
 * @param value The value to be modified
 * @param path The path of the value that should be modified
 * @param toSet The value that should be set at the path
 */
const ensureValueInQuery = (value: any, path: string, toSet: any) => {
  const arrayQueryKeys = intersection(keys(value), arrayWithSubFieldsOperators)
  if (arrayQueryKeys.length > 0) {
    for (const key of arrayQueryKeys) {
      const length = value[key].length
      for (let i = 0; i < length; i++) {
        set(value, `${key}[${i}].${path}`, toSet)
      }
    }
  } else {
    set(value, path, toSet)
  }
  return value
}

export default ensureValueInQuery
