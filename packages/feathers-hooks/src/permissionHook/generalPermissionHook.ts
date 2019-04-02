import { Forbidden } from "@feathersjs/errors"
import { Hook } from "@feathersjs/feathers"
import { Permission, validatePermission } from "@xpfw/permission"
import { get, isString } from "lodash"
import { Method } from "../globals"
import { GeneralPermissionHook } from "../typeDef"

const generalPermissionHook: GeneralPermissionHook = (permissions, method, additionalOptions) => {
  const getIdFrom: any = get(additionalOptions, "docIdPath", "id")
  const validationHook: Hook = async (hook) => {
    if (permissions == null) {
      return hook
    }
    const currentUser = get(hook, "params.user")
    const idToUse: any = get(hook, getIdFrom)
    const userIdPath: any = get(additionalOptions, "idPath", "_id")
    const userId = get(currentUser, userIdPath)
    let doc: any = null
    if (userId !== Permission.Server) {
      if (additionalOptions != null && isString(additionalOptions.serviceName) &&
      (method === Method.Patch || method === Method.Get ||
        method === Method.Update || method === Method.Remove)) {
        try {
          const app: any = hook.app
          doc = await app.service(additionalOptions.serviceName).get(idToUse, {
            user: {[userIdPath]: Permission.Server}
          })
        } catch (e) {
          doc = null
        }
      } else if (method === Method.Create) {
        doc = hook.data
      } else if (method === Method.Find) {
        doc = hook.params.query
      }
    }
    const userIsPermitted = await validatePermission(currentUser, {
      ...additionalOptions,
      docId: idToUse, doc, method,
      custom: {feathers: hook.app}, permissions
    })
    if (!userIsPermitted) {
      throw new Forbidden("insufficient permission")
    }
    return hook
  }
  return validationHook
}

export default generalPermissionHook
