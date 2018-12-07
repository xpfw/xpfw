import { FieldType } from "../globals"
import { IField } from "../typeDef"

const idField: IField = {
  type: FieldType.Text,
  mapTo: "_id",
  validate: {
    hide: {
      create: true,
      update: true,
      find: true,
      remove: true
    }
  }
}

export { idField }
