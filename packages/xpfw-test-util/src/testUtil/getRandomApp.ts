import authentication from "@feathersjs/authentication"
import jwt from "@feathersjs/authentication-jwt"
import local, { hooks } from "@feathersjs/authentication-local"
import * as handler from "@feathersjs/errors/handler"
import * as express from "@feathersjs/express"
import * as rest from "@feathersjs/express/rest"
import feathers, { Application, Service } from "@feathersjs/feathers"
import * as sios from "@feathersjs/socketio"
import * as memdb from "feathers-memory"
import * as mongoService from "feathers-mongodb"
import { get, isString } from "lodash"
import { MongoClient } from "mongodb"
import convertIds from "./convertIds"
import emptyPort from "./emptyPort"

const sio: any = sios
const res: any = rest
const mongoServic: any = mongoService
const memd: any = memdb
const auth: any = authentication
const promisifyListen = (app: any, port: number) => {
  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      resolve(server)
    })
  })
}

const channelName = "authenticated"

const getRandomApp = async (memoryServiceNames: string | string[],
                            useMongo?: boolean, ClientHolder?: any, useRest: boolean = false,
                            options?: {
                              userStore?: any, convertIds?: boolean, dbStore?: any, collections?: string[]
                            }) => {
  const app: any = express.default(feathers())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  let col: any | undefined
  let db: any | undefined
  let c: any
  app.configure(useRest ? res() : sio())
  app.configure(auth({secret: "myawfulsecret"}))
  app.configure(local())
  app.configure(jwt())
  let port = -1
  if (ClientHolder) {
    port = await emptyPort()
  }
  if (isString(memoryServiceNames)) {
    memoryServiceNames = [memoryServiceNames]
  }
  if (useMongo) {
    c = await MongoClient.connect(`mongodb://localhost:27017/`)
    db  = c.db("feathersxpfwvalidatetests" + port)
    for (const memoryServiceName of memoryServiceNames) {
      col = db.collection(`testFor${memoryServiceName}`)
      app.use(memoryServiceName, mongoServic({
        Model: col,
        paginate: {default: 10, max: 100}
      }))
      if (get(options, "convertIds", false)) {
        app.service(memoryServiceName).hooks({
          before: {
            create: [convertIds("_id", false)],
            update: [convertIds("_id", false)],
            patch: [convertIds("_id", false)],
            find: [convertIds("_id", true)]
          }
        })
      }
    }
  } else {
    for (const memoryServiceName of memoryServiceNames) {
      app.use(memoryServiceName, memd({paginate: {default: 10, max: 100}}))
    }
  }
  if (!useRest) {
    for (const memoryServiceName of memoryServiceNames) {
      app.service(memoryServiceName).publish((data: any, context: any) => {
        return app.channel(channelName)
      })
    }
  }
  app.use("users", memd({paginate: {default: 10, max: 100}}))
  app.service("users").hooks({
    // Make sure `password` never gets sent to the client
    after: hooks.protect("password"),
    before: {
      find: [
        auth.hooks.authenticate("jwt")
      ],
      create: [
        hooks.hashPassword({ passwordField: "password" })
      ]
    }
  })
  app.service("authentication").hooks({
    before: {
     create: [
      // You can chain multiple strategies
      auth.hooks.authenticate(["jwt", "local"])
     ],
     remove: [
      auth.hooks.authenticate("jwt")
     ]
    }
   })

  app.on("login", (payload: any, { connection }: any) => {
    if (connection) {
      app.channel(channelName).join(connection)
    }
  })
  let server: any
  if (ClientHolder) {
    server = await promisifyListen(app, port)
    ClientHolder.connectTo(`http://localhost:${port}`, {
      useRest, userStore: get(options, "userStore"),
      dbStore: get(options, "dbStore"), collections: get(options, "collections")
    })
  }
  return Promise.resolve({
    app,
    port,
    cleanUp: async () => {
      if (useMongo) {
        await db.dropDatabase()
        await c.close()
      }
      if (ClientHolder) {
        ClientHolder.disconnect(useRest)
        server.close()
      }
    }
  })
}

export default getRandomApp
