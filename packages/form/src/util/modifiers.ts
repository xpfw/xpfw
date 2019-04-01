import { ModifyFunction } from "@xpfw/form"
import { get } from "lodash"
import { ExtendedJSONSchema } from "@xpfw/form"

const useModifier =
async (value: any, schema: ExtendedJSONSchema, method: string) => {
  let valToReturn = value
  let modifiers = schema.modify
  if (modifiers != null) {
    if (!Array.isArray(modifiers)) {
      modifiers = [modifiers]
    }
    for (const modifier of modifiers) {
      valToReturn = await modifier(valToReturn, schema, method)
    }
  }
  return valToReturn
}

const executeForMethods = (f: ModifyFunction, methods?: string[]) => {
  const modifier: ModifyFunction = (value, schema, method) => {
    if (methods == null || methods.indexOf(method) !== -1) {
      return f(value, schema, method)
    }
    return Promise.resolve(value)
  }
  return modifier
}

const addTimeStamp = (path: string, methods?: string[]) => {
  const timestampAdder: ModifyFunction = executeForMethods((value) => {
    value[path] = new Date()
    return Promise.resolve(value)
  }, methods)
  return timestampAdder
}

export {
  executeForMethods, addTimeStamp, useModifier
}
