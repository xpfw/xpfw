import { isObject } from "lodash"
import { IField, IForm } from "../typeDef"

const getFieldsFromForm: (form: IForm) => IField[] = (form: IForm) => {
  const fields: IField[] = []
  if (isObject(form)) {
    for (const section of form.sections) {
      for (const field of section.fields) {
        fields.push(field)
      }
    }
  }
  return fields
}

export { getFieldsFromForm }
