import { globals, IField, IForm, ValidationRegistry } from "@xpfw/validate"

const FieldType = globals.FieldType
const RequiredType = globals.RequiredType

const TagName: IField = {
  mapTo: "tagName",
  type: FieldType.Text,
  validate: {required: {type: RequiredType.Always}}
}
const TagDescription: IField = {
  mapTo: "description",
  type: FieldType.Text
}

const TagModel: IForm = {
  model: "tagModel",
  collection: "tags",
  sections: [{fields: [TagName, TagDescription]}],
  options: {
    idPath: "_id"
  }
}


const Title: IField = {
  mapTo: "title",
  type: FieldType.Text,
  validate: {required: {type: RequiredType.Always}}
}

const Tags: IField = {
  mapTo: "tags",
  type: FieldType.RelationshipMulti,
  validate: {
    relationshipNamePath: TagName.mapTo,
    relationshipCollection: TagModel.collection,
    relationshipIdPath: "_id"
  }
}

const TagCollectionModel: IForm = {
  model: "tagColModel",
  collection: "tagCol",
  sections: [{fields: [Title, Tags]}],
  options: {
    idPath: "_id"
  }
}

ValidationRegistry.registerForm(TagModel)
ValidationRegistry.registerForm(TagCollectionModel)

const RecipeName: IField = {
  mapTo: "name",
  type: FieldType.Text,
  validate: {required: {type: RequiredType.Always}}
}

const RecipeAuthor: IField = {
  mapTo: "createdBy",
  type: FieldType.Text,
  validate: {required: {type: RequiredType.Always}}
}

const RecipeDate: IField = {
  mapTo: "createdAt",
  type: FieldType.Date
}

const RecipeModel: IForm = {
  model: "recipeModel",
  collection: "recipes",
  sections: [{fields: [RecipeName, RecipeAuthor, RecipeDate]}],
  options: {
    idPath: "_id"
  }
}

ValidationRegistry.registerForm(RecipeModel)

const siteGlobals = {
  linkClass: "tag is-rounded is-white has-text-link is-size-6",
  contentClass: "is-size-5 smallMarginTop has-text-centered",
  externalLinkConfig: {
    className: "has-text-link",
    target: "_blank"
  },
  gitRoot: "https://github.com/xpfw/xpfw/tree/master/",
  webRoot: "https://xpfw.github.io/"
}

export default siteGlobals
export {
  TagModel, TagCollectionModel, TagName, TagDescription, Title, Tags,
  RecipeModel, RecipeName, RecipeAuthor, RecipeDate
}