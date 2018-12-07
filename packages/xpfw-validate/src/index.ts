import fieldConverter from "./fieldConverter"
import globals from "./globals"
import getPermissionForField from "./permission/getPermissionForField"
import validatePermission from "./permission/validatePermission"
import ValidationRegistry from "./registry"
import TestDefs from "./testUtil/defs"
import {
  IDiff, IField, IFieldError, IFieldSelect, IForm,
  IFormError, IParameters, IStatConfig, IUiClient, ValidateFunction
} from "./typeDef"
import createFormData from "./util/createFormData"
import { idField } from "./util/fields"
import filterFields from "./util/filterFields"
import { getFieldsFromForm } from "./util/form"
import iterateFields from "./util/iterateFields"
import prefixMaker from "./util/prefixMaker"
import options from "./util/xpfwOptions"
import validateField from "./validate/any"
import validateForm from "./validate/form"

const RequiredType = globals.RequiredType
const FieldType = globals.FieldType
const Method = globals.Method
const DateType = globals.DateType
const Permission = globals.Permission
const ErrorType = globals.ErrorType
const StatType = globals.StatType

export {
  ValidationRegistry,
  validateField,
  validateForm,
  validatePermission,
  globals, createFormData,
  IForm, IFieldError, IFormError, IDiff, IParameters,
  IField, IFieldSelect, IUiClient, IStatConfig,
  getPermissionForField,
  getFieldsFromForm,
  iterateFields,
  filterFields,
  fieldConverter,
  TestDefs,
  RequiredType,
  Permission,
  ErrorType,
  FieldType,
  Method,
  DateType,
  StatType,
  prefixMaker,
  idField,
  options,
  ValidateFunction
}
export default ValidationRegistry
