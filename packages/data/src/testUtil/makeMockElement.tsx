import { cloneDeep, get, isString, set } from "lodash-es"
import * as React from "react"

const idtmp: string[] = []

const makeMockElement = (name: string, stripIdsAt?: string | string[], idPath: string = "_id", stringifier?: () => any) => {
  return class extends React.Component<any, any> {
    public render() {
      const toStringify = stringifier ? stringifier() : this.props
      const stripMe = Array.isArray(stripIdsAt) ? stripIdsAt : [stripIdsAt]
      if (Array.isArray(stripMe)) {
        for (const stripper of stripMe) {
          if (isString(stripper)) {
            let toStrip = get(this.props, stripper)
            if (!Array.isArray(toStrip)) {
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
            if (newIds.length > 0 && newIds[0] != null) {
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
