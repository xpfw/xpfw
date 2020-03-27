import { get, isFunction, isString } from "lodash"
import { IParameters,  Permission } from "./permissionSchema"

const validatePermission: (currentUser: any,
                           options: IParameters) => Promise<boolean> =
                           async (currentUser, options) => {
  const idPath = options != null && isString(options.idPath) ? options.idPath : `_id`
  const userId = get(currentUser, idPath)
  if (!get(options, `permissions.disableAdminOverride`, false) && userId === Permission.Server) {
    return Promise.resolve(true)
  }
  if (options != null && options.permissions != null && options.permissions.check != null &&
    isFunction(options.permissions.check)) {
    const res = await options.permissions.check(currentUser, options)
    if (res != null) {
      return res
    }
  }
  const type = get(options, `permissions.required.${options ? options.method : ""}`)
  if (type === Permission.User) {
    return Promise.resolve(userId != null)
  }
  if (type === Permission.Owner) {
    const p: any = get(options, "directOwnershipPath", "belongsTo")
    return Promise.resolve(options != null && (get(options, `docId`) === userId ||
     get(get(options, "doc"), p) === userId))
  }
  if (type === Permission.Server) {
    return Promise.resolve(userId === Permission.Server)
  }
  if (type === Permission.Public) {
    return Promise.resolve(true)
  }
  return Promise.resolve(false)
}

export default validatePermission
