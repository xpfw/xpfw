import { get, isArray, isBoolean, isNumber, isObject } from "lodash"
import { IField, IForm } from "../typeDef"

/**
 * This uses validation.hide to determine wether the field should be included
 * @param form
 */
const filterFields = (form: IForm, method: string = "create") => {
  const fields: IField[] = []
  if (isObject(form) && isArray(form.sections)) {
    for (const section of form.sections) {
      for (const field of section.fields) {
        let hide = get(field, "validate.hide")
        if (isObject(hide)) {
          hide = get(hide, method, false)
        }
        let shouldPush = true
        if (isBoolean(hide) && hide || isNumber(hide) && hide !== 0) {
          shouldPush = false
        }
        if (shouldPush) {
          fields.push(field)
        }
      }
    }
  }
  return fields
}

export default filterFields
