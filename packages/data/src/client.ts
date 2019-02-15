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
