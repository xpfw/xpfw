export interface IParametersBase {
  /**
   * The Permission definition
   *
   * @memberof IParametersBase
   */
  permissions?: IPermissionSchema
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

export type GetPermissions =
(currentUser: any, options: IParameters) => Promise<boolean | null>

export type GetPermissionCustom<T> =
(currentUser: any, options: IParametersCustom<T>) => Promise<boolean | null>

export interface IPermTypes {
  create?: number
  update?: number
  find?: number
  get?: number
  remove?: number
}

export interface IPermissionSchema {
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
   * For certain types or custom checks you can pass options here
   * e.g. for the Role-check you can specify which roles need to be presented
   */
  custom?: any
  /**
   * If your users ID is Permissions.Server then allow any action
   * Set to true to disable. Per default server override will be enabled
   */
  disableAdminOverride?: boolean
}

const Permission = {
  Public: -1,
  User: 2,
  Owner: 3,
  Server: 4
}

export {
  Permission
}
