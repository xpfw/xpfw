// import { makeStatBackend } from "@xpfw/dm"

const statServiceConfigurator = (app: any) => {
  // const statService = {
  //   create: async (data: any, params: any) => {
  //     const client: any = {
  //       find: async (collection: any, query: any) => {
  //         params.query = query
  //         return app.service(collection).find(params)
  //       }
  //     }
  //     return makeStatBackend(client, data.collection, data.config, data.query)
  //   }
  // }
  // app.use("stats", statService)
}

export default statServiceConfigurator
