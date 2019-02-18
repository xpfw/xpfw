import { ExtendedJSONSchema, JSONSchemaDefinition } from "@xpfw/form"
import UserStore from "../store/user"

const MailField: JSONSchemaDefinition = {
  title: "email",
  type: "string"
}
const PwField: JSONSchemaDefinition = {
  title: "password",
  type: "string",
  format: "password"
}

/**
 * Be sure to adjust relationship(Id|NamePath) to your user object
 */
const OwnerField: ExtendedJSONSchema = {
  title: "belongsTo",
  type: "relationshipSingle",
  relationship: {
    namePath: MailField.title,
    collection: "user"
  }
}

const AuthForm: ExtendedJSONSchema = {
  title: "authForm",
  collection: "user",
  required: [String(MailField.title), String(PwField.title)],
  properties: {
    [String(MailField.title)]: MailField,
    [String(PwField.title)]: PwField
  }
}

const submitLogin = () => UserStore.login()
const submitRegister = async () => {
  const registerRes = await UserStore.register()
  await submitLogin()
  return registerRes
}
const submitLogout = () => UserStore.logout()

const useAuth = () => {
  return {
    loading: UserStore.getLoading(),
    user: UserStore.getUser(),
    loggedIn: UserStore.getLoggedIn(),
    error: UserStore.getAuthErr(),
    connected: UserStore.getConnected(),
    submitLogout, submitLogin, submitRegister
  }
}

export default useAuth
export {
  AuthForm, PwField, MailField, OwnerField,
  submitLogin, submitRegister, submitLogout
}
