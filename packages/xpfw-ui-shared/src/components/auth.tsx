import { FormErrorStore, FormStore } from "@xpfw/form-shared"
import { globals, IField, IForm, IFormError } from "@xpfw/validate"
import { get, isNil } from "lodash"
import * as React from "react"
import { ComponentBase } from "resub"
import DbStore from "../store/db"
import UserStore from "../store/user"

const FieldType = globals.FieldType
const RequiredType = globals.RequiredType

const MailField: IField = {
  mapTo: "email",
  type: FieldType.Text,
  validate: {required: {type: RequiredType.Always}}
}
const PwField: IField = {
  mapTo: "password",
  type: FieldType.Password,
  validate: {required: {type: RequiredType.Always}}
}

/**
 * Be sure to adjust relationship(Id|NamePath) to your user object
 */
const OwnerField: IField = {
  mapTo: "belongsTo",
  type: FieldType.RelationshipSingle,
  validate: {
    relationshipNamePath: MailField.mapTo,
    relationshipCollection: "user"
  }
}

const AuthForm: IForm = {
  model: "authForm",
  collection: "user",
  sections: [{fields: [MailField, PwField]}]
}

export interface ISharedFormAuth extends React.Props<any> {
}

export interface ISharedFormAuthState {
  error?: any
  user?: any
  connected: boolean
  loggedIn: boolean
  loading: boolean
}

export interface IFormAuthProps extends ISharedFormAuth, ISharedFormAuthState {
  submitLogin: any
  submitRegister: any
  submitLogout: any
}
const submitLogin = () => UserStore.login()
const submitRegister = async () => {
  const registerRes = await UserStore.register()
  await submitLogin()
  return registerRes
}
const submitLogout = () => UserStore.logout()

function SharedFormAuth<T>(Component: React.ComponentType<IFormAuthProps & T>):
  React.ComponentType<ISharedFormAuth & T> {
  return class extends ComponentBase<ISharedFormAuth & T, ISharedFormAuthState> {
    public render() {
      const customProps = {
        submitLogin, submitRegister, submitLogout
      }
      return <Component {...this.props} {...this.state} {...customProps} />
    }
    protected _buildState(props: ISharedFormAuth, initialBuild: boolean): ISharedFormAuthState {
      return {
        loading: UserStore.getLoading(),
        user: UserStore.getUser(),
        loggedIn: UserStore.getLoggedIn(),
        error: UserStore.getAuthErr(),
        connected: UserStore.getConnected()
      }
    }
  }
}

export default SharedFormAuth
export {
  AuthForm, PwField, MailField, OwnerField,
  submitLogin, submitRegister, submitLogout
}
