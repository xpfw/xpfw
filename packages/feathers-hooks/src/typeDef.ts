import { Hook } from "@feathersjs/feathers"
import { ExtendedJSONSchema } from "@xpfw/form"
import { IParameters, IPermissionSchema } from "@xpfw/permission"

export type ValidateHook = (form: ExtendedJSONSchema, custom?: IParameters) => Promise<Hook>
export type GeneralValidateHook = (form: ExtendedJSONSchema, method: string, custom?: IParameters) => Promise<Hook>

export type PermissionHook = (form: IPermissionSchema, custom?: IParameters) => Hook
export type GeneralPermissionHook = (form: IPermissionSchema, method: string, custom?: IParameters) => Hook
