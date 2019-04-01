
import { executeForMethods, ModifyFunction } from "@xpfw/form"
import { get } from "lodash"
import dataOptions from "../options"
import UserStore from "../store/user"

const addUserId = (path: string, methods?: string[]) => {
  const userIdAdder: ModifyFunction = executeForMethods((value) => {
    value[path] = get(UserStore.getUser(), dataOptions.idPath)
    return Promise.resolve(value)
  }, methods)
  return userIdAdder
}
const addDefaultSort = (sortValue: any, methods?: string[]) => {
  const userIdAdder: ModifyFunction = executeForMethods((value) => {
    if (value.$sort == null) {
      value.$sort = sortValue
    }
    return Promise.resolve(value)
  }, methods)
  return userIdAdder
}

export {
  addUserId, addDefaultSort
}
