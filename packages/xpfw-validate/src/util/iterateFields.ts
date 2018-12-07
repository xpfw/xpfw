import { IField, IForm } from "../typeDef"
import { isObject, isArray } from "lodash"

const iterateFields = (form: IForm, iteratee: (field: IField) => void) => {
  if (isObject(form) && isArray(form.sections)) {
    for (const section of form.sections) {
      for (const field of section.fields) {
        iteratee(field)
      }
    }
  }
}

export default iterateFields