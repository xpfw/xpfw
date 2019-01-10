import { IField } from "@xpfw/validate"
import { cloneDeep, get, isNumber } from "lodash"
import * as React from "react"
import { IFieldProps } from "./field"

const increaseSize = (thisRef: any) => {
  return (index: any) => {
    let currentArray = get(thisRef, "props.value")
    if (!Array.isArray(currentArray)) {
      currentArray = []
    }
    currentArray = cloneDeep(currentArray)
    if (isNumber(index)) {
      currentArray.splice(index, 0, undefined)
    } else {
      if (currentArray.length === 0) {
        currentArray.push(undefined)
      }
      currentArray.push(undefined)
    }
    thisRef.props.setValue(currentArray)
  }
}

const removeItem = (thisRef: any) => {
  return (index: any) => {
    return () => {
      let currentArray = get(thisRef, "props.value", [])
      currentArray = cloneDeep(currentArray)
      currentArray.splice(index, 1)
      thisRef.props.setValue(currentArray)
    }
  }
}

export interface IArrayProps extends IFieldProps {
  increaseSize: any
  removeItem: any
  subFields: IField[]
}

const SharedArray = (Container: React.ComponentType<IArrayProps>) => {
  return class extends React.Component<IFieldProps, any> {
    public increaseSize: any
    public removeItem: any
    constructor(props: any) {
      super(props)
      this.increaseSize = increaseSize(this)
      this.removeItem = removeItem(this)
    }
    public render() {
      const subFields = []
      let arraySize = 1
      if (Array.isArray(this.props.value) && this.props.value.length > 0) {
        arraySize = this.props.value.length
      }
      for (let i = 0; i < arraySize; i++) {
        const subFieldDef: IField = {
          type: get(this.props.field, "validate.type"),
          mapTo: `${get(this.props.field, "mapTo")}[${i}]`,
          validate: get(this.props.field, "validate.validate")
        }
        subFields.push(subFieldDef)
      }
      return (
        <Container
          {...this.props}
          increaseSize={this.increaseSize}
          removeItem={this.removeItem}
          subFields={subFields}
        />
      )
    }
  }
}

export default SharedArray
export {
  increaseSize, removeItem
}
