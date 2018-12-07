import { Hook } from "@feathersjs/feathers"
import { globals, IForm, IParameters } from "@xpfw/validate"

export type ValidateHook = (form: IForm, custom?: IParameters) => Hook
export type GeneralValidateHook = (form: IForm, method: string, custom?: IParameters) => Hook
