import { RecipeModel, TagCollectionModel, TagModel } from "../../globals"

const getForm = (collection: string) => {
  switch (collection) {
    case TagCollectionModel.collection: return TagCollectionModel
    case TagModel.collection: return TagModel
    case RecipeModel.collection:
    default: {
      return RecipeModel
    }
  }
}

export default getForm
