import { get, isNil, isObject, isString } from "lodash"
import { Method } from "../globals"
import { IField } from "../typeDef"

const getPermissionForField: (field: IField, checkType?: string) => any =
(field, checkType = `find`) => {
  if (isObject(field) && !isNil(field.validate)) {
    const permission = field.validate.permission
    if (isObject(permission)) {
      return get(permission, checkType)
    }
  }
  return null
}

export default getPermissionForField
