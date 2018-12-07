import { FieldType } from "../../globals"
import { IField } from "../../typeDef"
import getPossibleCombos from "./getPossibleCombos"

const isAllowedSpecialQueryKey: (key: string, field: IField) => boolean = (key: string, field: IField) => {
  if (field.type === FieldType.Object) {
    const possibleCombos = getPossibleCombos(field, ``)
    for (const combo of possibleCombos) {
      if (key === combo) {
        return true
      }
    }
  }
  return key === field.mapTo
}

export default isAllowedSpecialQueryKey
