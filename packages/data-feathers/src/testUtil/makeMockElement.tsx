import * as React from "react"
import { get, set, isString, isArray, cloneDeep } from "lodash";

const idtmp: string[] = []

const makeMockElement = (name: string, stripIdsAt?: string, idPath: string = "_id") => {
  return class extends React.Component<any, any> {
    public render() {
      const toStringify = this.props
      if (isString(stripIdsAt)) {
        let toStrip = get(this.props, stripIdsAt)
        if (!isArray(toStrip)) {
          toStrip = [toStrip]
        }
        const newIds = []
        for (const obj of toStrip) {
          const id = get(obj, idPath)
          let newId = idtmp.indexOf(id)
          if (newId === -1) {
            newId = idtmp.length + 1
            idtmp.push(id)
          }
          const objClone = cloneDeep(obj)
          set(objClone, idPath, newId)
          newIds.push(objClone)
        }
        set(toStringify, stripIdsAt, newIds)
      }
      return (
        <div className={name}>
          {JSON.stringify(toStringify, undefined, 2)}
        </div>
      )
    }
  }
}

export default makeMockElement
