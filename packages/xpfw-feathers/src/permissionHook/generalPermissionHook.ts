import { Forbidden } from "@feathersjs/errors"
import { Hook } from "@feathersjs/feathers"
import ValidationRegistry, {
  globals, Permission, validatePermission
} from "@xpfw/validate"
import { get, isNil, isString, merge, set } from "lodash"
import { GeneralValidateHook } from "../typeDef"

const generalPermissionHook: GeneralValidateHook = (form, method, additionalOptions) => {
  const getIdFrom: any = get(additionalOptions, "docIdPath", "id")
  const permissions = get(form, "permissions")
  const validationHook: Hook = async (hook) => {
    if (isNil(permissions)) {
      return hook
    }
    const currentUser = get(hook, "params.user")
    const idToUse: any = get(hook, getIdFrom)
    const userIdPath: any = get(additionalOptions, "idPath", "_id")
    const userId = get(currentUser, userIdPath)
    let doc: any = null
    if (userId !== Permission.Server && userId !== Permission.Admin) {
        if (!isNil(additionalOptions) && isString(additionalOptions.serviceName) &&
        (method === globals.Method.Patch || method === globals.Method.Get ||
          method === globals.Method.Update || method === globals.Method.Remove)) {
        try {
          const app: any = hook.app
          doc = await app.service(additionalOptions.serviceName).get(idToUse, {
            user: {[userIdPath]: Permission.Server}
          })
        } catch (e) {
          doc = null
        }
      } else if (method === globals.Method.Create) {
        doc = hook.data
      } else if (method === globals.Method.Find) {
        doc = hook.params.query
      }
    }
    const userIsPermitted = await validatePermission(currentUser, merge({
      docId: idToUse, doc, registry: ValidationRegistry, method, isOffline: false,
      custom: {feathers: hook.app}, form
    }, additionalOptions))
    if (!userIsPermitted) {
      throw new Forbidden("insufficient permission")
    }
    return hook
  }
  return validationHook
}

export default generalPermissionHook
