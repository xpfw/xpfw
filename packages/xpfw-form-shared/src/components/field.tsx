import { IField, IFieldError, IForm, FieldType } from "@xpfw/validate"
import { get, isNil } from "lodash"
import * as React from "react"
import { ComponentBase } from "resub"
import ComponentRegistry from "../componentRegistry"
import FormErrorStore from "../store/error"
import FormStore from "../store/form"

export interface ISharedField extends React.Props<any> {
  prefix?: string
  user?: any
  field: IField
  form?: IForm
  theme?: string
  method?: string
  className?: string
  style?: any
}

export interface ISharedFieldState {
  value: any
  error?: IFieldError
}

export type SetFieldValue = (newValue: any) => void

export interface IFieldProps extends ISharedField, ISharedFieldState {
  setValue: SetFieldValue
}

const setValueWrap = (thisRef: {props: ISharedField}) => {
  return async (newValue: any) => {
    const currentUser = get(thisRef, "props.user")
    const prefix = get(thisRef.props, "prefix", "")
    const valuePath = `${prefix && prefix.length > 0 ? prefix + "." : ""}${get(thisRef, "props.field.mapTo", "undefined")}`
    const type = get(thisRef, "props.field.type")
    FormStore.setValue(valuePath, newValue, type === FieldType.Array)
    const field = get(thisRef, "props.field")
    const form = get(thisRef, "props.form")
    if (!isNil(field)) {
      await FormStore.validateField(field, form, get(thisRef, "props.method"), prefix, currentUser)
    }
    if (!isNil(form)) {
      await FormStore.validateForm(form, get(thisRef, "props.method"), prefix, currentUser)
    }
  }
}

class SharedField extends ComponentBase<ISharedField, any> {
  public setValue: SetFieldValue
  public constructor(props: ISharedField) {
    super(props)
    this.setValue = setValueWrap(this)
  }
  public componentWillMount() {
    const defaultValue = get(this.props, "field.validate.defaultValue")
    if (!isNil(defaultValue)) {
      const prefix = get(this.props, "prefix", "")
      const valuePath = `${prefix && prefix.length > 0 ? prefix + "." : ""}${get(this.props, "field.mapTo", "undefined")}`
      if (isNil(FormStore.getValue(valuePath))) {
        FormStore.setValue(valuePath, defaultValue)
      }
    }
    super.componentWillMount()
  }
  public render() {
    const type = get(this.props, "field.type", 2)
    const Component: any = ComponentRegistry.getComponent(type, this.props.theme)
    return <Component {...this.props} {...this.state} setValue={this.setValue} />
  }
  protected _buildState(props: ISharedField, initialBuild: boolean): ISharedFieldState {
    const prefix = get(props, "prefix", "")
    const valuePath = `${prefix && prefix.length > 0 ? prefix + "." : ""}${get(props, "field.mapTo", "undefined")}`
    return {
      value: FormStore.getValue(valuePath),
      error: FormErrorStore.getError(valuePath)
    }
  }
}

export default SharedField
export {
  setValueWrap
}
