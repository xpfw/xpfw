import { get, isNil, isString } from "lodash"
import { IForm, IParameters } from "../typeDef"
import { getFieldsFromForm } from "../util/form"
import validatePermission from "./validatePermission"

const getPermittedFields: (form: IForm, options: IParameters, passRealFields?: boolean) => any =
async (form, options, passRealFields) => {
  const fieldDefsForCollection = getFieldsFromForm(form)
  const permittedFields: any = passRealFields ? [] : {}
  const visibilityResults: any[] = []
  for (let arrayIndex = 0; arrayIndex < fieldDefsForCollection.length; arrayIndex++) {
    const fieldDef = fieldDefsForCollection[arrayIndex]
    if (!isNil(fieldDef)) {
      const key = fieldDef.mapTo
      if (isString(key)) {
        if (!isNil(options)) {
          options.field = fieldDef
        }
        visibilityResults[arrayIndex] = await validatePermission(get(options, "currentUser"), options, true)
      }
    }
  }
  for (let arrayIndex = 0; arrayIndex < fieldDefsForCollection.length; arrayIndex++) {
    const fieldDef = fieldDefsForCollection[arrayIndex]
    const canBeViewed = visibilityResults[arrayIndex]
    if (!isNil(fieldDef) && canBeViewed) {
      if (passRealFields) {
        permittedFields.push(fieldDef)
      } else {
        const key = fieldDef.mapTo
        if (canBeViewed && isString(key)) {
          permittedFields[key] = true
        }
      }
    }
  }
  return permittedFields
}

export default getPermittedFields
