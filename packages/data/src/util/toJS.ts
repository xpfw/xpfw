import { toJS as original } from "mobx"

const toJS = (source: any) => {
  return original(source)
}

export default toJS
