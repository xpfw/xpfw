export interface ISelectItem {
  label: string
  value: any
}

export type ValidateFunction = (value: any, options: IField, additionalParams: IParametersBase) => Promise<any>

export interface IValidateRequiredOptions {
  type: number
  model?: string | string[]
  values?: any
}

export type FieldConverter = (value: any) => any
export type FieldConvertFunc =
FieldConverter | {create?: FieldConverter, update?: FieldConverter, find?: FieldConverter}

export interface IValidateOptions {
  /**
   * Wether the field should be required and under which circumstances
   */
  required?: IValidateRequiredOptions

  /**
   * Minimum Value (for Number) or Length (for string, array, etc.)
   *
   * @type {number}
   * @memberof IValidateOptions
   */
  min?: number

  /**
   * Maximum Value (for Number) or Length (for string, array, etc.)
   *
   * @type {number}
   * @memberof IValidateOptions
   */
  max?: number

  /**
   * Step Size for number fields
   *
   * @type {number}
   * @memberof IValidateOptions
   */
  step?: number
  /**
   * Recursive ValidationOptions allow for defining Objects or Arrays in one Definition
   *
   * @type {IValidateOptions}
   * @memberof IValidateOptions
   */
  validate?: IValidateOptions
  customOpts?: any
  /**
   * Will check if current value equals the given <Field.mapTo> Key
   * Will check IParametersBase.formData at parameters.formData.<Field.mapTo>
   *
   * @type {string[]}
   * @memberof IValidateOptions
   */
  match?: string[]
  /**
   * Enhance your Validation by adding a custom Check Function
   *
   * @type {ValidateFunction}
   * @memberof IValidateOptions
   */
  custom?: ValidateFunction
  /**
   * For Arrays the expected Type of the content of the array
   * For Date it can be one of global.DateType
   * @type {(number | string)}
   * @memberof IValidateOptions
   */
  type?: number | string
  objectDef?: IField[]

  /**
   * Validate the current user has at least this perm level
   * in order to make ALL actions if number or a specific action
   */
  permission?: IPermTypes

  /** If value isn't set then set it to this one */
  defaultValue?: any

  /**
   * Use this to hide fields in specific contexts
   * Hidden of false / 0, shown if true
   */
  hide?: IFieldVisibilityDef
  /**
   * Customize what FormStore.getFormData produces on a per field basis
   * Like hide and permission this can be set globally or per Method
   * @type {FieldConvetFunc}
   * @memberof IValidateOptions
   */
  convert?: FieldConvertFunc
  /**
   * Collection to search in if Field has type RelationshipSingle or RelationshipMany
   */
  relationshipCollection?: string
  /**
   * Path to get name from if has  type RelationshipSingle or RelationshipMany
   */
  relationshipNamePath?: string
  /**
   * Path to get id from if has  type RelationshipSingle or RelationshipMany
   */
  relationshipIdPath?: string
}

export type SelectOptions = ISelectItem[]

export type SelectOptionGetter = (state: any) => SelectOptions

export type SelectOptionsField = SelectOptions | SelectOptionGetter

export interface IFieldVisibilityDef {
  create?: boolean
  update?: boolean
  find?: boolean
  remove?: boolean
}
export interface IField {
  type: string | number
  mapTo: string
  theme?: string
  validate?: IValidateOptions
}

export interface IFormSection {
  fields: IField[]
  name?: string
}

export interface IStatConfig {
  type: string
  /**
   * used for recognition in react elements
   */
  id: string
  options?: any
}

export interface IForm {
  model: string
  sections: IFormSection[]
  collection?: string
  icon?: any
  multiCollection?: string[]
  permissions?: IPermissionsForForm
  /**
   * Configure numerical xpfw-dm using stats
   * See `globals.StatType` for available types
   */
  stats?: IStatConfig[]
  options?: {
    /**
     * will add belongsTo in ui-shared so Permission.Owner can properly function
     */
    addBelongsTo?: boolean
    /**
     * add and display a createdAt date field
     */
    addCreatedAt?: boolean
    /**
     * path to id for various things
     */
    idPath?: string
    /**
     * Function that will return the custom built query
     *
     * @type {Function}
     */
    queryBuilder?: (form: IForm, prefix?: string) => any
    /**
     * The default sort for this collection
     */
    defaultSort?: any
    /**
     * Wether in the related search a $nin query on the idPath field should be included
     * Be sure to convert the strings into ObjectIds on the server side in case you are using MongoDb!
     */
    filterOutById?: boolean
  }
}

export interface IFormInstance extends IForm {
  getFields: IField[]
}

export interface IFieldSelect extends IField {
  selectOptions?: SelectOptionsField
}

export interface IFieldWithOptions<T> extends IField {
  additionalOptions?: T
}

/**
 * The Registry is needed to enable things like a subpage /select/<formModel>.<fieldMapTo>
 * It can then only with the knowledge of the string find out if this field exists
 * and then display or do whatever with it
 *
 * @export
 * @interface IRegistry
 */
export interface IRegistry {
  forms: {[index: string]: IForm}
  fields: {[index: string]: IField}
  validators: {[index: string]: ValidateFunction}
  registerField: (field: IField) => void
  findField: (mapTo: string) => IField | null
  registerForm: (form: IForm) => void
  findForm: (model: string) => IForm
  registerValidator: (name: string, validator: ValidateFunction) => void
  findValidator: (name: string) => ValidateFunction | null
}

/**
 * Parameters are supposed to be a universal way to pass relevant JS-refs
 * to write validation / permission / whatever functions that can try searching
 * offline data first / throw error if not connected / fetch data if missing via custom
 */
export interface IParametersBase {
  /**
   * The Field that you want to check
   *
   * @type {IField}
   * @memberof IParametersBase
   */
  field?: IField
  /**
   * The Form containing your Field
   * This is required for validatePermission checks
   */
  form?: IForm
  /**
   * Type of method so you can allow fields only in certain situations (find but not update etc.)
   *
   * @type {string}
   * @memberof IParametersBase
   */
  method?: string
  /**
   * If you are searching for a Document save it here
   *
   * @type {string}
   * @memberof IParametersBase
   */
  docId?: string
  doc?: any
  /**
   * Helper Variable you can set to indicate wether server requests are currently possible
   *
   * @type {boolean}
   * @memberof IParametersBase
   */
  isOffline?: boolean
  /**
   * Here you can pass any Object that will help you to achieve your task offline
   *
   * @type {*}
   * @memberof IParametersBase
   */
  offlineData?: any
  /**
   * This should contain the current state mapping of your form
   * e.g. {
   *  "LoginForm.username": "im user"
   * }
   * where LoginForm = IForm.model and username = IField.mapTo
   * @type {*}
   * @memberof IParametersBase
   */
  formData?: any
  /**
   * Form Registry to use for validation.
   *
   * @type {IRegistry}
   * @memberof IParametersBase
   */
  registry: IRegistry
  /**
   * validatePermission will check the ID of a User and search for it here via lodash.get
   */
  idPath?: string
  /**
   * Put the currently authenticated user in here for Permission Checks
   */
  currentUser?: any
  /**
   * validatePermission will check if the current userID equals this key of the object
   * given object {belongsTo: "myUserId"} and currentUser has "myUserId" as id this will return Permission.Owner
   */
  directOwnershipPath?: string
  /**
   * The Permissions Hook will try to feathers.get the object via this serviceName
   * The ID this is called with is gotten from hook at `docIdPath`
   */
  serviceName?: string
  /**
   * See `servicename`
   */
  docIdPath?: string
}

/**
 * Utiltily Interface so you can have type checked sub functions for your custom parameters
 */
export interface IParametersCustom<T> extends IParametersBase {
  custom?: T
}

/**
 * For when you don't want typechecked custom parameters :)
 */
export interface IParameters extends IParametersBase {
  custom?: any
}

export type getPermitted = (currentType: number, requiredType?: number) => Promise<boolean>

export type validate = (field: IField) => Promise<any>

export interface IErrorBase {
  type: number | string
}
export interface IError extends IErrorBase {
  custom?: any
}

export interface IErrorCustom<T> extends IErrorBase {
  custom?: T
}

export interface IFieldError {
  mapTo: string
  errors: IError[]
}
export interface IDiff {
  mapTo: string
  prev: any
  new: any
}

export interface IFormError {
    model: string
    errors: IFieldError[]
}

export type GetPermissions =
(currentUser: any, options: IParameters) => Promise<boolean | null>

export type GetPermissionCustom<T> =
(currentUser: any, options: IParametersCustom<T>) => Promise<boolean | null>

export interface IPermTypes {
  create?: string
  update?: string
  find?: string
  get?: string
  remove?: string
}

export interface IPermissionsForForm {
  /**
   * Specify a PermissionType as string
   */
  required?: IPermTypes
  /**
   * This will let you override the check by returning a boolean if the user should be allowed.
   * Return null if you wish the xpfw-native check based on `required` permissions to return its own result
   * That way you can limit your `check`-function to e.g. only return on create functions.
   */
  check?: GetPermissions | GetPermissionCustom<any>
  /**
   * Make sure that the result of a `validateForm` call has the current userId set at this key
   *
   */
  requireOwner?: string | IPermTypes
  /**
   * For certain types or custom checks you can pass options here
   * e.g. for the Role-check you can specify which roles need to be presented
   */
  custom?: any
  /**
   * If your users ID is Permissions.Server or Permissions.Admin then allow any action
   * Set to true to disable
   */
  disableAdminOverride?: boolean
}

export interface IUiClient {
  client: any
  connectTo: (url: string, options?: {
    authOptions?: any,
    makeAuth?: boolean,
    useRest?: boolean,
    userStore?: any
    /**
     * Pass the dbStore to get realtime updates
     */
    dbStore?: any
    /**
     * Realtime Updates will only be fetched for collections defined here
     */
    collections?: string[]
  }) => void
  disconnect: () => void,
  login: (loginData: any) => Promise<{user: any, custom?: any}>,
  register: (registerData: any) => Promise<any>,
  logout: () => Promise<any>,
  get: (collection: string, id: any) => Promise<any>,
  remove: (collection: string, id: any) => Promise<any>,
  create: (collection: string, createData: any) => Promise<any>,
  find: (collection: string, createData: any) => Promise<any>,
  patch: (collection: string, id: any, createData: any) => Promise<any>,
}
