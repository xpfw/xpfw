import { makeStatBackend } from "@xpfw/dm"
import StatStore from "../store/stat"

const statServiceConfigurator = (app: any) => {
  const find = (collection: any, query: any) => app.service(collection).find({query})
  const statService = {
    create: async (data: any) => {
      return makeStatBackend(find, data.collection, data.config, data.query)
    }
  }
  app.use(StatStore.statCollection, statService)
}

export default statServiceConfigurator
