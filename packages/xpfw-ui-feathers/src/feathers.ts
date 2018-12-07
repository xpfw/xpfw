import auth from "@feathersjs/authentication-client"
import * as feathers from "@feathersjs/feathers"
import restClient from "@feathersjs/rest-client"
import socketio from "@feathersjs/socketio-client"
import { globals, IUiClient, ValidationRegistry } from "@xpfw/validate"
import { get, isNil } from "lodash"
import * as sio from "socket.io-client"

const f: any = feathers
const io: any = sio

const listenToFeathersAuthEvents = (app: any, store: any) => {
  const logoutHandler = (authRes: any) => {
    store.loggedOut()
    app.authenticate()
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
        store.setItem(get(eventData, idPath), collection, isRemove ? null : {result: eventData})
      }
    }
    const dbService = app.service(collection)
    const idPath = get(ValidationRegistry, `forms.${collection}.options.idPath`, "id")
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
  return FeathersClient.get(globals.options.userCollection, get(verification, "userId"))
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
    return FeathersClient.client.service(globals.options.userCollection).create(registerData)
  },
  logout: () => {
    return FeathersClient.client.logout()
  },
  get: (collection: string, id: any) => {
    return FeathersClient.client.service(collection).get(id)
  },
  remove: (collection: string, id: any) => {
    return FeathersClient.client.service(collection).remove(id)
  },
  create: (collection: string, createData: any) => {
    return FeathersClient.client.service(collection).create(createData)
  },
  find: (collection: string, queryObj: any) => {
    return FeathersClient.client.service(collection).find({query: queryObj})
  },
  patch: (collection: string, id: any, createData: any) => {
    return FeathersClient.client.service(collection).patch(id, createData)
  }
}

export default FeathersClient
