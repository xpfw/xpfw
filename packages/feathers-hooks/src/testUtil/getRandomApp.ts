import express from "@feathersjs/express"
import rest from "@feathersjs/express/rest"
import feathers from "@feathersjs/feathers"
import memdb from "feathers-memory"
import mongoService from "feathers-mongodb"
import { MongoClient } from "mongodb"

const memd: any = memdb
const getRandomApp = async (memoryServiceName: string, useMongo?: boolean) => {
  const f: any = feathers()
  const app: any = express.default(f)
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  let col: any | undefined
  let db: any | undefined
  let c: any
  app.configure(rest())
  if (useMongo) {
    c = await MongoClient.connect(`mongodb://localhost:27017/`)
    db  = c.db("feathersxpfwvalidatetests")
    col = db.collection(`testFor${memoryServiceName}`)
    app.use(memoryServiceName, mongoService({
      Model: col,
      paginate: {default: 10, max: 100}
    }))
  } else {
    app.use(memoryServiceName, memd({paginate: {default: 10, max: 100}}))
  }
  return Promise.resolve({
    app,
    service: app.service(memoryServiceName),
    cleanUpDb: async () => {
      if (useMongo) {
        await col.drop()
        await c.close()
      }
    }
  })
}

export default getRandomApp
