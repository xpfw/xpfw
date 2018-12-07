import { FieldType, Permission, RequiredType } from "../globals"
import { IField, IForm } from "../typeDef"

const RequiredTextField: IField = {
  mapTo: "myString",
  type: FieldType.Text,
  validate: {required: {type: RequiredType.Always}}
}
const NumberField: IField = {
  mapTo: "myNum",
  type: FieldType.Number,
  validate: {}
}

const FormNumberAndRequiredText: IForm = {
  model: "formModel",
  collection: "simpleTestCol",
  sections: [{fields: [RequiredTextField]}, {fields: [NumberField]}]
}

const TextArrayField: IField = {
  mapTo: "myArray",
  type: FieldType.Array,
  validate: {
    type: FieldType.Text
  }
}

const CreatedAtField: IField = {
  mapTo: "createdAt",
  type: FieldType.Date,
  validate: {
    hide: {create: true, update: false, find: false, remove: false}
  }
}

const FormNumberReqTextWithCreationDate: IForm = {
  model: "formDateModel",
  collection: "DatesimpleTestCol",
  sections: [{fields: [RequiredTextField]}, {fields: [NumberField, CreatedAtField]}],
  options: {
    addCreatedAt: true
  }
}
const FormArray: IForm = {
  model: "arrayModel",
  collection: "arrayCol",
  sections: [{fields: [TextArrayField]}, {fields: [NumberField, CreatedAtField]}],
  options: {
    addCreatedAt: true
  }
}

const RelationshipSingleField: IField = {
  mapTo: "ownedBy",
  type: FieldType.RelationshipSingle,
  validate: {
    relationshipCollection: FormNumberAndRequiredText.collection,
    relationshipNamePath: RequiredTextField.mapTo
  }
}

const RelationshipMultiField: IField = {
  mapTo: "ownedByMulti",
  type: FieldType.RelationshipMulti,
  validate: {
    relationshipCollection: FormNumberAndRequiredText.collection,
    relationshipNamePath: RequiredTextField.mapTo
  }
}

const FormRelationshipToNumAndRequiredText: IForm = {
  model: "relationshipFormModel",
  collection: "myRelationshipCollection",
  sections: [{fields: [RelationshipSingleField, RelationshipMultiField]}, {fields: [NumberField]}]
}

const NumberFieldNested: IField = {
  mapTo: "my.nested.number",
  type: FieldType.Number,
  validate: {}
}

const NumberObjectField: IField = {
  mapTo: "myObj",
  type: FieldType.Object,
  validate: {
    objectDef: [NumberField, NumberFieldNested]
  }
}

const FormForUpdateTest: IForm = {
  model: "updateFormTest",
  sections: [{fields: [NumberFieldNested]}]
}

const NameFieldPublic: IField = {
  mapTo: "guestName",
  type: FieldType.Text,
  validate: {
    permission: {
      find: Permission.Guest,
      update: Permission.Guest,
      create: Permission.Guest,
      remove: Permission.Guest
    }
  }
}

const BooleanFieldWithMultiPermissions: IField = {
  mapTo: "permbool",
  type: FieldType.Boolean,
  validate: {
    permission: {
      find: Permission.User,
      update: Permission.Server,
      create: Permission.User,
      remove: Permission.Server
    }
  }
}

const ObjectWithDifferingPermsPerKey: IField = {
  mapTo: "permObj",
  type: FieldType.Text,
  validate: {
    objectDef: [NameFieldPublic, BooleanFieldWithMultiPermissions]
  }
}

const FormWithPermissionsOnFields: IForm = {
  model: "permFormTest",
  sections: [{fields: [NameFieldPublic, BooleanFieldWithMultiPermissions, ObjectWithDifferingPermsPerKey]}]
}

const FormWithPermissionsOnFieldsAndGeneralPerms: IForm = {
  model: "permFormTest",
  sections: [{fields: [NameFieldPublic, BooleanFieldWithMultiPermissions, ObjectWithDifferingPermsPerKey]}],
  permissions: {
    required: {
      create: Permission.User,
      find: Permission.Guest,
      get: Permission.Guest,
      update: Permission.Owner,
      remove: Permission.Owner
    }
  }
}

const TestDefs = {
  RequiredTextField, NumberField, FormNumberAndRequiredText,
  NumberFieldNested, FormForUpdateTest,  NumberObjectField, RelationshipMultiField, RelationshipSingleField,
  NameFieldPublic, BooleanFieldWithMultiPermissions, ObjectWithDifferingPermsPerKey, FormWithPermissionsOnFields,
  FormWithPermissionsOnFieldsAndGeneralPerms, FormRelationshipToNumAndRequiredText,
  FormNumberReqTextWithCreationDate, CreatedAtField, FormArray, TextArrayField
}

export default TestDefs
export {
  RequiredTextField, NumberField, FormNumberAndRequiredText,
  NumberFieldNested, FormForUpdateTest,  NumberObjectField, RelationshipMultiField, RelationshipSingleField,
  NameFieldPublic, BooleanFieldWithMultiPermissions, ObjectWithDifferingPermsPerKey, FormWithPermissionsOnFields,
  FormWithPermissionsOnFieldsAndGeneralPerms, FormRelationshipToNumAndRequiredText, FormNumberReqTextWithCreationDate,
  CreatedAtField, FormArray, TextArrayField
}
