import { FormStore } from "@xpfw/form"
import DbStore from "../store/db"

const useGet = (id: string, collection: string) => {
  const loading = FormStore.getLoading(id)
  return {
    item: DbStore.getGetState(id, collection, true),
    loading
  }
}

export default useGet
