import { AuthForm, MailField, PwField, UserStore } from "@xpfw/data"
import { makeSubFields } from "@xpfw/form-tests"

const setterHelpers = makeSubFields(AuthForm)

const login = async () => {
  setterHelpers[String(MailField.title)].setValue("user")
  setterHelpers[String(PwField.title)].setValue("pw")
  await UserStore.register()
  await UserStore.login()
  setterHelpers[String(AuthForm.title)].setValue(undefined)
}

export default login
