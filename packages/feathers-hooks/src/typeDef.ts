import { Hook } from "@feathersjs/feathers"
import { IParameters, IPermissionSchema } from "@xpfw/permission"

export type ValidateHook = (form: IPermissionSchema, custom?: IParameters) => Hook
export type GeneralValidateHook = (form: IPermissionSchema, method: string, custom?: IParameters) => Hook
