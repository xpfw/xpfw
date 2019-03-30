import { StatType } from "@xpfw/dm"
import { ExtendedJSONSchema } from "@xpfw/form"
import { changeValToRegex } from "./components/ui/regex"

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
  modify: {
    queryModifier: changeValToRegex(String(TagName.title))
  }
}

const TagCollectionStats = [{
  id: "Some",
  type: StatType.sum,
  options: {itemPath: `${Tags.title}.length`}
}, {
  id: "Average",
  type: StatType.mean,
  options: {itemPath: `${Tags.title}.length`}
}, {
  id: "timeDistance",
  type: StatType.avgPrevTimeDistance,
  options: {itemPath: CreatedAt.title}
}, {
  id: "timeStepson",
  type: StatType.timeStep,
  options: {subType: StatType.sum, subConfig: {itemPath: `${Tags.title}.length`}}
}, {
  id: "timeStepMean",
  type: StatType.timeStep,
  options: {subType: StatType.mean, subConfig: {itemPath: `${Tags.title}.length`}}
}, {
  id: "timeSteppedDistance",
  type: StatType.timeStep,
  options: {subType: StatType.avgPrevTimeDistance, subConfig: {itemPath: `${Tags.title}.length`}}
}]

const TagCollectionModel: ExtendedJSONSchema = {
  title: "tagColModel",
  collection: "tagCol",
  required: [String(Title.title)],
  properties: {
    [String(Title.title)]: Title,
    [String(Tags.title)]: Tags,
    [String(CreatedAt.title)]: CreatedAt
  }
}

const RecipeName: ExtendedJSONSchema = {
  title: "name",
  type: "string"
}

const RecipeAuthor: ExtendedJSONSchema = {
  title: "createdBy",
  type: "string"
}

const RecipeDate: ExtendedJSONSchema = {
  title: "createdAt",
  type: "object",
  format: "date-time"
}

const RecipeModel: ExtendedJSONSchema = {
  title: "recipeModel",
  collection: "recipes",
  required: [String(RecipeName.title), String(RecipeAuthor.title)],
  properties: {
    [String(RecipeName.title)]: RecipeName,
    [String(RecipeAuthor.title)]: RecipeAuthor
  }
}

const siteGlobals = {
  linkClass: "tag is-rounded is-white has-text-link is-size-6",
  contentClass: "is-size-5 smallMarginTop has-text-centered",
  externalLinkConfig: {
    className: "has-text-link",
    target: "_blank"
  },
  gitRoot: "https://github.com/xpfw/xpfw/",
  pkgRoot: "https://github.com/xpfw/xpfw/tree/master/packages/"
}

export default siteGlobals
export {
  TagModel, TagCollectionModel, TagName, TagDescription, Title, Tags,
  RecipeModel, RecipeName, RecipeAuthor, RecipeDate, CreatedAt
}
