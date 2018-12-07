import { endsWith, get, isArray } from "lodash"
import { FieldType } from "../../globals"
import { IField } from "../../typeDef"

const getPossibleCombos: (field: IField, root: string, combos?: string[]) => string[] = (field, root, combos = []) => {
  const nextEntry = `${root}${root.length === 0 || endsWith(root, ".") ? "" : "."}${field.mapTo}`
  combos.push(nextEntry)
  if (field.type === FieldType.Object) {
    const subFields: any = get(field, "validate.objectDef")
    if (isArray(subFields)) {
      for (const subField of subFields) {
        combos = getPossibleCombos(subField, nextEntry, combos)
      }
    }
  }
  return combos
}

export default getPossibleCombos
