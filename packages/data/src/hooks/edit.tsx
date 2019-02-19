import { ExtendedJSONSchema, FormStore, getMapTo, jsonValidator, memo, prependPrefix } from "@xpfw/form"
import { useEffect } from "react"
import DbStore from "../store/db"
import UserStore from "../store/user"
import toJS from "../util/toJS"

const submitEdit = (id: string, schema: ExtendedJSONSchema, mapTo?: string, prefix?: string) => {
  return () => {
    if (mapTo == null) {
      mapTo = getMapTo(schema, mapTo)
    }
    const newValue = toJS(FormStore.getValue(mapTo, prefix))
    jsonValidator.validate(schema, newValue)
    FormStore.setError(mapTo + id, jsonValidator.errors, prefix)
    const err = FormStore.getError(mapTo + id, prefix)
    if (err == null) {
      return DbStore.patch(id, schema, mapTo, prefix)
    }
    return err
  }
}
const u: any = DbStore
const useEdit = (id: string, schema: ExtendedJSONSchema, mapTo?: string, prefix?: string, reset?: boolean) => {
  if (mapTo == null) { mapTo = getMapTo(schema, mapTo) }
  const valuePath = `${prependPrefix(mapTo, prefix)}${id}`
  useEffect(() => {
    if (reset) {
      u.currentlyEditing = ""
      u.updateState[prependPrefix(mapTo, prefix)] = null
      FormStore.setValue(mapTo, {}, prefix)
    }
  }, [reset])
  return {
    error: FormStore.getError(valuePath),
    state: DbStore.getUpdateState(valuePath),
    loading: FormStore.getLoading(valuePath),
    original: DbStore.getEditOriginal(id, schema, mapTo, prefix, false),
    user: UserStore.getUser(),
    submitEdit: memo(() => submitEdit(id, schema, mapTo, prefix),
      ["submitEdit", id, JSON.stringify(schema), mapTo, prefix])
  }
}

export interface IEditHookProps {
  schema: ExtendedJSONSchema
  id: string
  prefix?: string
  mapTo?: string
  reset?: boolean
}

const useEditWithProps = (props: IEditHookProps) => useEdit(props.id, props.schema, props.mapTo, props.prefix, props.reset)

export default useEdit
export {
  useEditWithProps, submitEdit
}
