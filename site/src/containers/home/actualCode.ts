const basicFormCode =
`import { FieldType, IField, IForm, RequiredType, ValidationRegistry } from "@xpfw/validate"
const RecipeModel: IForm = {
  model: "recipeModel",
  collection: "recipes",
  sections: [{fields: [{
    mapTo: "name",
    type: FieldType.Text,
    validate: {required: {type: RequiredType.Always}}
  }, {
    mapTo: "createdBy",
    type: FieldType.Text,
    validate: {required: {type: RequiredType.Always}}
  }, {
    mapTo: "createdAt",
    type: FieldType.Date
  }]}]
}
ValidationRegistry.registerForm(RecipeModel)`

const relationshipCode = `import { FieldType, RequiredType, IField, IForm, ValidationRegistry } from "@xpfw/validate"
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
ValidationRegistry.registerForm(TagCollectionModel)`

const statCode = `import { StatType } from "@xpfw/validate"
import { TagCollectionModel } from "./tagModel"

TagCollectionModel.stats = [{
  id: "Some",
  type: StatType.sum,
  options: {itemPath: \`\${Tags.mapTo}.length\`}
},{
  id: "Average",
  type: StatType.mean,
  options: {itemPath: \`\${Tags.mapTo}.length\`}
},{
  id: "timeDistance",
  type: StatType.avgPrevTimeDistance,
  options: {itemPath: CreatedAt.mapTo}
},{
  id: "timeStepson",
  type: StatType.timeStep,
  options: {subType: StatType.sum, subConfig: {itemPath: \`\${Tags.mapTo}.length\`}}
},{
  id: "timeStepMean",
  type: StatType.timeStep,
  options: {subType: StatType.mean, subConfig: {itemPath: \`\${Tags.mapTo}.length\`}}
},{
  id: "timeSteppedDistance",
  type: StatType.timeStep,
  options: {subType: StatType.avgPrevTimeDistance, subConfig: {itemPath: \`\${Tags.mapTo}.length\`}}
}]`

export {
  basicFormCode, relationshipCode, statCode
}