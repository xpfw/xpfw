import { authenticate, AuthenticationService, JWTStrategy } from "@feathersjs/authentication"
import { hooks, LocalStrategy } from "@feathersjs/authentication-local"
import * as express from "@feathersjs/express"
import * as rest from "@feathersjs/express/rest"
import feathers, { Hook, HookContext } from "@feathersjs/feathers"
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
const promisifyListen = (app: any, port: number) => {
  return new Promise((resolve) => {
    let server: any
    server = app.listen(port, () => {
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
  const f: any = feathers()

  const app: any = express.default(f)
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  let col: any | undefined
  let db: any | undefined
  let c: any
  app.configure(useRest ? res() : sio())
  app.set("authentication", {
    secret: "test_secret",
    entity: "user",
    service: "users",
    authStrategies: [ "jwt", "local" ],
    jwtOptions: {
      header: { typ: "access" },
      audience: "https://xpfw.github.io",
      issuer: "feathers",
      algorithm: "HS256",
      expiresIn: "1d"
    },
    local: {
      usernameField: "email", passwordField: "password"
    }
  })
  const authService = new AuthenticationService(app)
  authService.register("jwt", new JWTStrategy())
  authService.register("local", new LocalStrategy())
  app.use("/authentication", authService)
  let port = -1
  if (ClientHolder) {
    port = await emptyPort()
  }
  if (isString(memoryServiceNames)) {
    memoryServiceNames = [memoryServiceNames]
  }
  if (useMongo) {
    c = await MongoClient.connect(`mongodb://localhost:27017/`, { useNewUrlParser: true })
    db  = c.db("feathersxpfwvalidatetests" + port)
    for (const memoryServiceName of memoryServiceNames) {
      col = db.collection(`testFor${memoryServiceName}`)
      app.use(memoryServiceName, mongoServic({
        Model: col,
        paginate: {default: 10, max: 100},
        whitelist: ["$regex", "$options"]
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
        authenticate("jwt")
      ],
      create: [
        hooks.hashPassword("password")
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
