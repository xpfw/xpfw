import { FormErrorStore, FormStore, LoadingStore } from "@xpfw/form-shared"
import { filterFields, globals, IField, IForm, IFormError } from "@xpfw/validate"
import { get, isNil } from "lodash"
import * as React from "react"
import { ComponentBase } from "resub"
import DbStore from "../store/db"
import UserStore from "../store/user"

export interface ISharedFormEdit extends React.Props<any> {
  prefix?: string
  id?: string
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

export interface ISharedFormEditState {
  error?: IFormError
  state?: any
  original?: any
  user?: any
  loading: boolean
}

export type SubmitEdit = () => Promise<any>

export interface IFormEditProps extends ISharedFormEdit, ISharedFormEditState {
  submitEdit: SubmitEdit
  /** Prefiltered Fields to display */
  fields: IField[]
}

const submitEdit = (thisRef: {props: ISharedFormEdit}) => {
  return async () => {
    const prefix = get(thisRef, "props.prefix", "")
    await FormStore.validateForm(get(thisRef, "props.form"),
      globals.Method.Update, prefix, get(thisRef, "state.user"))
    const err =
    FormErrorStore.getError(`${prefix && prefix.length > 0 ? prefix + "." : ""}${get(thisRef, "props.form.model")}`)
    let res
    if (!isNil(err) && err.ok) {
      res = await DbStore.patch(get(thisRef, "props.id"),
        get(thisRef, "props.form"), get(thisRef, "props.prefix"))
    }
    return res
  }
}

function SharedFormEdit<T>(Component: React.ComponentType<IFormEditProps & T>):
React.ComponentType<ISharedFormEdit & T> {
  return class extends ComponentBase<ISharedFormEdit & T, ISharedFormEditState> {
    public submitEdit: SubmitEdit
    public constructor(props: ISharedFormEdit & T) {
      super(props)
      this.submitEdit = submitEdit(this)
    }
    public componentWillMount() {
      const prefix: any = get(this.props, "prefix", "")
      const valuePath = `${prefix && prefix.length > 0 ? prefix + "." : ""}${get(this.props, "id", "")}${get(this.props, "form.model", "undefined")}`
      if (this.props.resetOnMount) {
        FormErrorStore.setError(valuePath, undefined)
      }
      if (this.props.resetState) {
        DbStore.setUpdateState(valuePath, undefined)
      }
      super.componentWillMount()
    }
    public render() {
      return (
        <Component
          {...this.props}
          {...this.state}
          submitEdit={this.submitEdit}
          fields={filterFields(this.props.form, globals.Method.Update)}
        />
      )
    }
    protected _buildState(props: ISharedFormEdit, initialBuild: boolean): ISharedFormEditState {
      const prefix: any = get(props, "prefix", "")
      const valuePath = `${prefix && prefix.length > 0 ? prefix + "." : ""}${get(props, "id", "")}${get(props, "form.model", "undefined")}`
      const id: any = get(props, "id", "none")
      const collection = get(props, "form.collection", "none")
      return {
        error: FormErrorStore.getError(valuePath),
        state: DbStore.getUpdateState(valuePath),
        loading: LoadingStore.getLoading(valuePath),
        original: DbStore.getEditOriginal(id, get(props, "form"), get(props, "prefix", "")),
        user: UserStore.getUser()
      }
    }
  }
}

export default SharedFormEdit
export {
  submitEdit
}
