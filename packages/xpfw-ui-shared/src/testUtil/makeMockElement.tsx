import { cloneDeep, get, isArray, isNil, isObject, isString, set } from "lodash"
import * as React from "react"

const idtmp: string[] = []

const makeMockElement = (name: string, stripIdsAt?: string | string[], idPath: string = "_id") => {
  return class extends React.Component<any, any> {
    public render() {
      const toStringify = this.props
      const stripMe = isArray(stripIdsAt) ? stripIdsAt : [stripIdsAt]
      if (isArray(stripIdsAt)) {
        for (const stripper of stripIdsAt) {
          if (isString(stripper)) {
            let toStrip = get(this.props, stripper)
            if (!isArray(toStrip)) {
              toStrip = [toStrip]
            }
            const newIds = []
            for (const obj of toStrip) {
              const id = isString(obj) ? obj : get(obj, idPath)
              let newId = idtmp.indexOf(id)
              if (newId === -1) {
                newId = idtmp.length + 1
                idtmp.push(id)
              }
              const objClone = cloneDeep(obj)
              if (isString(obj)) {
                newIds.push(newId)
              } else {
                set(objClone, idPath, newId)
                newIds.push(objClone)
              }
            }
            if (newIds.length > 0 && !isNil(newIds[0])) {
              set(toStringify, stripper, newIds)
            }
          }
        }
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
