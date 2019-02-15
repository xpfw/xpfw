import { FormErrorStore, FormStore, LoadingStore } from "@xpfw/form-shared"
import { filterFields, globals, IField, IForm, IFormError } from "@xpfw/validate"
import { get, isNil } from "lodash"
import * as React from "react"
import { ComponentBase } from "resub"
import DbStore, { IResult } from "../store/db"
import UserStore from "../store/user"

export interface ISharedFormCreate extends React.Props<any> {
  prefix?: string
  method?: string
  /**
   * Will reset the form values
   */
  resetOnMount?: boolean
  /**
   * Will reset the result of the last creation
   */
  resetState?: boolean
  form: IForm
}

export interface ISharedFormCreateState {
  error?: IFormError
  state?: any
  user?: any
  loading: boolean
}

export type SubmitCreate = () => Promise<any>

export interface IFormCreateProps extends ISharedFormCreate, ISharedFormCreateState {
  submitCreate: SubmitCreate
  /** Prefiltered Fields to display */
  fields: IField[]
}

const submitCreate = (thisRef: {props: ISharedFormCreate}) => {
  return async () => {
    const prefix = get(thisRef, "props.prefix", "")
    await FormStore.validateForm(get(thisRef, "props.form"),
      get(thisRef, "props.method"), prefix, get(thisRef, "state.user"))
    const err =
    FormErrorStore.getError(`${prefix && prefix.length > 0 ? prefix + "." : ""}${get(thisRef, "props.form.model")}`)
    let res
    if (!isNil(err) && err.ok) {
      res = await DbStore.create(get(thisRef, "props.form"), prefix)
    }
    return res
  }
}

function SharedFormCreate<T>(Component: React.ComponentType<IFormCreateProps & T>):
React.ComponentType<ISharedFormCreate & T> {
  return class extends ComponentBase<ISharedFormCreate & T, ISharedFormCreateState> {
    public submitCreate: SubmitCreate
    public constructor(props: ISharedFormCreate & T) {
      super(props)
      this.submitCreate = submitCreate(this)
    }
    public componentWillMount() {
      const prefix: any = get(this.props, "prefix", "")
      const valuePath =
        `${prefix && prefix.length > 0 ? prefix + "." : ""}${get(this.props, "form.model", "undefined")}`
      if (this.props.resetOnMount) {
        FormStore.resetForm(this.props.form, this.props.prefix)
        FormErrorStore.setError(valuePath, undefined)
      }
      if (this.props.resetState) {
        DbStore.setCreateState(valuePath, undefined)
      }
      super.componentWillMount()
    }
    public render() {
      return (
        <Component
          {...this.props}
          {...this.state}
          submitCreate={this.submitCreate}
          fields={filterFields(this.props.form, globals.Method.Create)}
        />
      )
    }
    protected _buildState(props: ISharedFormCreate, initialBuild: boolean): ISharedFormCreateState {
      const prefix = get(props, "prefix", "")
      const valuePath = `${prefix && prefix.length > 0 ? prefix + "." : ""}${get(props, "form.model", "undefined")}`
      return {
        error: FormErrorStore.getError(valuePath),
        state: DbStore.getCreateState(valuePath),
        loading: LoadingStore.getLoading(valuePath),
        user: UserStore.getUser()
      }
    }
  }
}

export default SharedFormCreate
export {
  submitCreate
}
