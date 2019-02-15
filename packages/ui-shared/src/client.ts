import { IUiClient } from "@xpfw/validate"

export interface IBackendClient {
  client: IUiClient
}

const emptyClient: IUiClient = {
  client: {},
  login: (createData: any) => Promise.resolve({user: createData}),
  logout: () => Promise.resolve(),
  register: (createData: any) => Promise.resolve(createData),
  create: (col: any, createData: any) => Promise.resolve(createData),
  patch: (createData: any) => Promise.resolve(null),
  get: (createData: any) => Promise.resolve(null),
  find: (createData: any) => Promise.resolve(null),
  remove: (createData: any) => Promise.resolve(null),
  connectTo: () => Promise.resolve(),
  disconnect: () => null
}

const BackendClient: IBackendClient = {
  client: emptyClient
}

export default BackendClient
