import { FormStore } from "@xpfw/form"
import DbStore from "../store/db"

const useGet = (id: string, collection: string) => {
  if (id == null || collection == null) {
    return {loading: false, item: undefined}
  }
  const loading = FormStore.getLoading(id)
  return {
    item: DbStore.getGetState(id, collection, true),
    loading
  }
}

export interface IGetHookProps {
  collection: string
  id: string
}

const useGetWithProps = (props: IGetHookProps) => useGet(props.id, props.collection)

export default useGet
export {
  useGetWithProps
}
