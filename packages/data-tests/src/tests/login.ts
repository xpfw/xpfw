import { FormStore } from "@xpfw/form-shared"
import { MailField, PwField, UserStore } from "@xpfw/ui-shared"

const login = async () => {
  FormStore.setValue(MailField.mapTo, "user")
  FormStore.setValue(PwField.mapTo, "pw")
  await UserStore.register()
  await UserStore.login()
}

export default login
