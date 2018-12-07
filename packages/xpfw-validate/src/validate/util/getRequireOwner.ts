import { get,  isObject, isString } from "lodash"
import { IForm } from "../../typeDef"

const getRequireOwner = (form: IForm, method: string) => {
  const requireOwner = get(form, "permissions.requireOwner")
  if (isObject(requireOwner) && !isString(requireOwner)) {
    return requireOwner[method]
  }
  return requireOwner
}

export default getRequireOwner
