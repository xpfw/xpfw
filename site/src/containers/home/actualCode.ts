import { TagCollectionStats } from "../../globals"

const relationshipCode = `import { executeForMethods, ExtendedJSONSchema } from "@xpfw/form"
import { changeValToRegex } from "@xpfw/data"
import { isString } from "lodash"

const TagName: ExtendedJSONSchema = {
  title: "tagName",
  type: "string"
}
const TagDescription: ExtendedJSONSchema = {
  title: "description",
  type: "string"
}

const TagModel: ExtendedJSONSchema = {
  title: "tagModel",
  collection: "tags",
  required: [String(TagName.title)],
  properties: {
    [String(TagName.title)]: TagName,
    [String(TagDescription.title)]: TagDescription
  }
}

const Title: ExtendedJSONSchema = {
  title: "title",
  type: "string"
}

const CreatedAt: ExtendedJSONSchema = {
  title: "createdAt",
  type: "string",
  format: "date-time"
}

const Tags: ExtendedJSONSchema = {
  title: "tags",
  type: "array",
  theme: "multi",
  relationship: {
    namePath: TagName.title,
    collection: TagModel.collection,
    idPath: "_id"
  },
  modify: changeValToRegex(String(TagName.title))
}

const TagCollectionModel: ExtendedJSONSchema = {
  title: "tagColModel",
  collection: "tagCol",
  required: [String(Title.title)],
  properties: {
    [String(Title.title)]: Title,
    [String(Tags.title)]: Tags,
    [String(CreatedAt.title)]: CreatedAt
  }
}`

const statCode = JSON.stringify(TagCollectionStats, undefined, 2)

export {
  relationshipCode, statCode
}
