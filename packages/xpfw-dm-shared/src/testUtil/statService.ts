import { makeStatBackend } from "@xpfw/dm"

const statServiceConfigurator = (app: any) => {
  const client: any = {
    find: (collection, query) => app.service(collection).find({query})
  }
  const statService = {
    create: async (data: any) => {
      return makeStatBackend(client, data.collection, data.config, data.query)
    }
  }
  app.use("stats", statService)
}

export default statServiceConfigurator
