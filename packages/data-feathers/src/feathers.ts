import auth from "@feathersjs/authentication-client"
import * as feathers from "@feathersjs/feathers"
import restClient from "@feathersjs/rest-client"
import socketio from "@feathersjs/socketio-client"
import { dataOptions, IUiClient } from "@xpfw/data"
import { get, isNil } from "lodash"
import * as sio from "socket.io-client"

const f: any = feathers
const io: any = sio

const listenToFeathersAuthEvents = (app: any, store: any) => {
  const logoutHandler = (authRes: any) => {
    store.loggedOut()
  }
  app.on("authenticated", async (authRes: any) => {
    store.setLoggedIn(await getDataFromToken(authRes.accessToken))
  })
  app.on("logout", logoutHandler)
  app.on("reauthentication-error", logoutHandler)
}

const listenToSocketConnection = (app: any, store: any) => {
  const socket = app.io
  const updateStatus = (state: boolean, login?: boolean) => () => {
    store.setConnected(state)
    if (login) { app.authenticate() }
  }
  socket.on("connect", updateStatus(true))
  socket.on(`reconnect`, updateStatus(true, true))
  socket.on(`disconnect`, updateStatus(false))
  socket.on(`connect_error`, updateStatus(false))
  socket.on(`connect_timeout`, updateStatus(false))
  socket.on(`reconnect_error`, updateStatus(false))
  socket.on(`reconnect_failed`, updateStatus(false))
}

const listenToFeathersServiceEvents = (app: any, store: any, collectionList: string) => {
  for (const collection of collectionList) {
    const eventHandler = (isRemove?: boolean) => {
      return (eventData: any) => {
        store.setItem(get(eventData, idPath), collection, isRemove ? null : eventData)
      }
    }
    const dbService = app.service(collection)
    const idPath = dataOptions.idPath
    dbService.on(`created`, eventHandler(false))
    dbService.on(`patched`, eventHandler(false))
    dbService.on(`updated`, eventHandler(false))
    dbService.on(`removed`, eventHandler(true))
  }
}

const getDataFromToken = async (token: any) => {
  const verification = await FeathersClient.client.passport.verifyJWT(token)
  if (verification.user) {
    return verification.user
  }
  return FeathersClient.get(dataOptions.userCollection, get(verification, "userId"))
}

export interface IQueueEntry {
  resolve: Function
  reject: Function
  collection: string
  method: string
  args: any
}

const feathersClientOptions: {
  batchService: string | undefined
  batchLimit: number
  batchWaitTime: number
} = {
  batchService: undefined,
  batchLimit: 100,
  batchWaitTime: 1
}

let queueTimeoutId: any
let queue: IQueueEntry[] = []

const clearQueue = async () => {
  const callArgs: any[] = []
  for (const item of queue) {
    callArgs.push([
      `${item.collection}::${item.method}`, ...item.args
    ])
  }
  try {
    const batchResult = await FeathersClient.client
    .service(feathersClientOptions.batchService).create({
      call: callArgs
    })
    for (let i = 0; i < batchResult.data.length; i++) {
      const indexRes = batchResult.data[i]
      const queueRef = queue[i]
      if (queueRef != null) {
        if (indexRes[0] == null) {
          queueRef.resolve(indexRes[1])
        } else {
          queueRef.reject(indexRes[1])
        }
      }
    }
    queue = []
    queueTimeoutId = undefined
  } catch (e) {
    console.log("ERROR doing batchcalls ", e)
  }
}

const queueCall = (collection: string, method: string, args: any[]) => {
  if (feathersClientOptions.batchService == null) {
    return FeathersClient.client.service(collection)[method](...args)
  }
  return new Promise((resolve, reject) => {
    if (queueTimeoutId != null) {
      clearTimeout(queueTimeoutId)
      queueTimeoutId = undefined
    }
    queue.push({resolve, reject, collection, method, args})
    queueTimeoutId = setTimeout(clearQueue, feathersClientOptions.batchWaitTime)
  })
}

const FeathersClient: IUiClient = {
  client: null,
  connectTo: (url: any, options: any) => {
    const app = f()
    if (get(options, "useRest", false)) {
      app.configure(restClient(url).fetch(fetch))
    } else {
      app.configure(socketio(io(url, {
        pingInterval: 20000,
        pingTimeout: 40000
      })))
      if (get(options, "dbStore") && get(options, "collections")) {
        listenToFeathersServiceEvents(app, get(options, "dbStore"),  get(options, "collections"))
      }
      if (get(options, "userStore")) {
        listenToSocketConnection(app, get(options, "userStore"))
      }
    }
    app.configure(auth(get(options, "authOptions", {})))
    FeathersClient.client = app
    if (get(options, "userStore")) {
      listenToFeathersAuthEvents(app, get(options, "userStore"))
    }
    if (get(options, "makeAuth")) {
      return app.authenticate()
    }
  },
  disconnect: () => {
    const oldClient = FeathersClient.client
    if (!isNil(oldClient) && oldClient.io) {
      oldClient.io.disconnect()
    }
    FeathersClient.client = null
  },
  login: async (loginData: any) => {
    const loginRes = await FeathersClient.client.authenticate(loginData)
    return {user: await getDataFromToken(loginRes.accessToken)}
  },
  register: (registerData: any) => {
    return FeathersClient.client.service(dataOptions.userCollection).create(registerData)
  },
  logout: () => {
    return FeathersClient.client.logout()
  },
  get: (collection: string, id: any) => {
    return queueCall(collection, "get", [id])
  },
  remove: (collection: string, id: any) => {
    return queueCall(collection, "remove", [id])
  },
  create: (collection: string, createData: any) => {
    return queueCall(collection, "create", [createData])
  },
  find: (collection: string, queryObj: any) => {
    return queueCall(collection, "find", [{query: queryObj}])
  },
  patch: (collection: string, id: any, createData: any) => {
    return queueCall(collection, "patch", [id, createData])
  }
}

export default FeathersClient

export {
  feathersClientOptions
}
