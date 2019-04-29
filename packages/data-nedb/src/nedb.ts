import { dataOptions, IUiClient } from "@xpfw/data"
import { cloneDeep } from "lodash"

const verifyCollectionExists = (collection: string) => {
  if (NedbClient.client.dbs[collection] === undefined || NedbClient.client.dbs[collection] === null) {
    NedbClient.client.dbs[collection] = new NedbClient.instanceCreator({
      filename: NedbClient.onlyInMemory ? undefined : collection,
      autoload: true
    })
  }
}

const NedbClient: IUiClient & { instanceCreator: any, onlyInMemory: boolean } = {
  instanceCreator: () => "",
  onlyInMemory: false,
  client: {
    dbs: {},
    createdCollections:  []
  },
  connectTo: (url: any, options: any) => {
    return Promise.reject("unsupported by this adapter")
  },
  disconnect: () => {
    return Promise.reject("unsupported by this adapter")
  },
  login: async (loginData: any) => {
    return Promise.reject("unsupported by this adapter")
  },
  register: (registerData: any) => {
    return Promise.reject("unsupported by this adapter")
  },
  logout: () => {
    return Promise.reject("unsupported by this adapter")
  },
  get: (collection: string, id: any) => {
    verifyCollectionExists(collection)
    return new Promise((resolve, reject) => {
      NedbClient.client.dbs[collection].findOne({[dataOptions.idPath]: id}, (err: any, docs: any) => {
        if (err !== null && err !== undefined) {
          reject(err)
        } else {
          resolve(docs)
        }
      })
    })
  },
  remove: (collection: string, id: any) => {
    verifyCollectionExists(collection)
    return new Promise((resolve, reject) => {
      NedbClient.client.dbs[collection].remove(
        {[dataOptions.idPath]: id}, {multi: false}, (err: any, docs: any) => {
        if (err !== null && err !== undefined) {
          reject(err)
        } else {
          resolve(docs)
        }
      })
    })
  },
  create: (collection: string, createData: any) => {
    verifyCollectionExists(collection)
    return new Promise((resolve, reject) => {
      NedbClient.client.dbs[collection].insert(createData, (err: any, newDoc: any) => {
        if (err !== null && err !== undefined) {
          reject(err)
        } else {
          resolve(newDoc)
        }
      })
    })
  },
  find: (collection: string, queryObj: any) => {
    verifyCollectionExists(collection)
    return new Promise((resolve, reject) => {
      const cloneQuery = cloneDeep(queryObj)
      const limit = queryObj.$limit
      delete cloneQuery.$limit
      const skip = queryObj.$skip
      delete cloneQuery.$skip
      const sort = queryObj.$sort
      delete cloneQuery.$sort
      const findBuilder = NedbClient.client.dbs[collection].find(cloneQuery)
      if (limit) {
        findBuilder.limit(limit)
      }
      if (skip) {
        findBuilder.skip(skip)
      }
      if (sort) {
        findBuilder.sort(sort)
      }
      NedbClient.client.dbs[collection].count(cloneQuery, (cErr: any, count: any) => {
        if (cErr !== null && cErr !== undefined) {
          reject(cErr)
        } else {
          findBuilder.exec((err: any, docs: any) => {
            if (err !== null && err !== undefined) {
              reject(err)
            } else {
              resolve({
                limit,
                skip,
                total: count,
                data: docs
              })
            }
          })
        }
      })
    })
  },
  patch: (collection: string, id: any, createData: any) => {
    verifyCollectionExists(collection)
    return new Promise((resolve, reject) => {
      NedbClient.client.dbs[collection].update({[dataOptions.idPath]: id},
      createData, {multi: false}, (err: any, docs: any) => {
        if (err !== null && err !== undefined) {
          reject(err)
        } else {
          resolve(docs)
        }
      })
    })
  }
}

export default NedbClient
