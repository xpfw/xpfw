import { ExtendedJSONSchema, FormStore, memo } from "@xpfw/form"
import DbStore, { REMOVE_ADDON_KEY } from "../store/db"

const submitRemove = (id: string, schema: ExtendedJSONSchema) => {
  return async () => {
    return DbStore.remove(id, String(schema.collection))
  }
}

const useRemove = (id: string, schema: ExtendedJSONSchema) => {
  return {
    state: DbStore.getRemoveState(id),
    loading: FormStore.getLoading(REMOVE_ADDON_KEY + id),
    submitRemove: memo(() => submitRemove(id, schema), [id, String(schema.collection)])
  }
}

export default useRemove
export {
  submitRemove
}
