import { Hook } from "@feathersjs/feathers"
import { ExtendedJSONSchema, useModifier } from "@xpfw/form"

const modifyHook = (schema: ExtendedJSONSchema) => {
  const modifierHook: Hook = async (hook) => {
    hook.data = await useModifier(hook.data, schema, hook.method)
    return hook
  }
  return modifierHook
}

export default modifyHook
