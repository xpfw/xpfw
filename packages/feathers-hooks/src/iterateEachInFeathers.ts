// import { iterateEachInFind } from "@xpfw/dm"

const iterateEachInFeathers =
(app: any, collection: string | string[],
 query: any,  iterator: (q: any) => Promise<any>, options?: {pageSize?: number}) => {
  // const findMethod = (c: string, q: any) => {
  //   return app.service(c).find({query: q})
  // }
  // return iterateEachInFind(collection, query, findMethod, iterator, options)
}

export default iterateEachInFeathers
