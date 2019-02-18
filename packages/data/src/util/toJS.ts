import { toJS as original } from "mobx"

const toJS = (source: any) => {
  return original(source, {exportMapsAsObjects: true, detectCycles: true, recurseEverything: true})
}

export default toJS
