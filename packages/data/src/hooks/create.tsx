import { ExtendedJSONSchema, FormStore, getMapTo, jsonValidator, memo, prependPrefix } from "@xpfw/form"
import { useEffect } from "react"
import DbStore from "../store/db"
import UserStore from "../store/user"
import toJS from "../util/toJS"

const submitCreate = (schema: ExtendedJSONSchema, mapTo?: string, prefix?: string) => {
  return async () => {
    if (mapTo == null) {
      mapTo = getMapTo(schema, mapTo)
    }
    const newValue = toJS(FormStore.getValue(mapTo, prefix))
    jsonValidator.validate(schema, newValue)
    FormStore.setError(mapTo, jsonValidator.errors, prefix)
    const err = FormStore.getError(mapTo, prefix)
    let res
    if (err == null) {
      res = await DbStore.create(schema, mapTo, prefix)
    }
    return res
  }
}
const u: any = DbStore
const useCreate = (schema: ExtendedJSONSchema, mapTo?: string, prefix?: string, reset?: boolean) => {
  if (mapTo == null) { mapTo = getMapTo(schema, mapTo) }
  useEffect(() => {
    if (reset) {
      u.createState[prependPrefix(mapTo, prefix)] = null
      FormStore.setValue(mapTo, {}, prefix)
      FormStore.setError(mapTo, undefined, prefix)
    }
  }, [reset])
  return {
    error: FormStore.getError(mapTo, prefix),
    state: DbStore.getCreateState(mapTo, prefix),
    loading: FormStore.getLoading(mapTo, prefix),
    user: UserStore.getUser(),
    submitCreate: memo(() => submitCreate(schema, mapTo, prefix),
      ["submitCreate", JSON.stringify(schema), mapTo, prefix])
  }
}

export interface ICreateHookProps {
  schema: ExtendedJSONSchema
  prefix?: string
  mapTo?: string
  reset?: boolean
}

const useCreateWithProps = (props: ICreateHookProps) => useCreate(props.schema, props.mapTo, props.prefix, props.reset)

export default useCreate
export {
  useCreateWithProps, submitCreate
}
