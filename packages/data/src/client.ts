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

const emptyClient: IUiClient & any = {
  client: {},
  currentId: 0,
  data: {},
  ensureCol: (col: string) => {
    if (emptyClient.data[col] == null) {
      emptyClient.data[col] = {}
    }
  },
  login: (createData: any) => Promise.resolve({user: createData}),
  logout: () => Promise.resolve(),
  register: (createData: any) => Promise.resolve(createData),
  create: (col: any, createData: any) => {
    emptyClient.ensureCol(col)
    createData._id = emptyClient.currentId
    emptyClient.data[col][emptyClient.currentId] = createData
    emptyClient.currentId++
    return Promise.resolve(createData)
  },
  patch: (col: string, id: any, createData: any) => {
    emptyClient.ensureCol(col)
    createData._id = id
    emptyClient.data[col][id] = createData
    return Promise.resolve(createData)
  },
  get: (col: string, id: any) => {
    emptyClient.ensureCol(col)
    return Promise.resolve(emptyClient.data[col][id])
  },
  find: (col: string, createData: any) => {
    const data = []
    for (const k of Object.keys(emptyClient.data[col])) {
      data.push(emptyClient.data[col][k])
    }
    return Promise.resolve({
      limit: 0, skip: 0, total: data.length, data
    })
  },
  remove: (col: string, id: any) => {
    emptyClient.ensureCol(col)
    const removedRecord = emptyClient.data[col][id]
    delete emptyClient.data[col][id]
    return Promise.resolve(removedRecord)
  },
  connectTo: () => Promise.resolve(),
  disconnect: () => null
}

const BackendClient: IBackendClient = {
  client: emptyClient
}

export default BackendClient
