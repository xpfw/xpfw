import { get, isFunction, isNil, isObject, isString } from "lodash"
import { Permission } from "../globals"
import { IParameters } from "../typeDef"

const validatePermission: (currentUser: any,
                           options: IParameters, forField?: boolean) => Promise<boolean> =
                           async (currentUser, options, forField) => {
  const idPath = isObject(options) && isString(options.idPath) ? options.idPath : `_id`
  const userId = get(currentUser, idPath)
  if (!isNil(options) && !isNil(options.form) &&
    !isNil(options.form.permissions) && isFunction(options.form.permissions.check)) {
    const res = await options.form.permissions.check(currentUser, options)
    if (!isNil(res)) {
      return res
    }
  }
  const type = get(options,
    `${forField ? "field.validate.permission" :  "form.permissions.required"}.${options ? options.method : ""}`)
  if (type === Permission.User) {
    return Promise.resolve(!isNil(userId))
  }
  if (type === Permission.Owner) {
    const p: any = get(options, "directOwnershipPath", "belongsTo")
    return Promise.resolve(!isNil(options) && (get(options, `docId`) === userId ||
     get(get(options, "doc"), p) === userId))
  }
  if (type === Permission.Admin) {
    return Promise.resolve(userId === Permission.Admin)
  }
  if (type === Permission.Server) {
    return Promise.resolve(userId === Permission.Server)
  }
  if (type === Permission.Guest) {
    return Promise.resolve(true)
  }
  return Promise.resolve(true)
}

export default validatePermission
