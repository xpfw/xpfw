import { cloneDeep, get, isArray, isObject } from "lodash"

export interface IEachInFindOptions {
  pageSize?: number
}
const iterateEachInFind =
async (collection: string | string[],
       queryObj: any, findMethod: (c: string, q: any) => Promise<any>, iterator: (obj: any) => Promise<any>,
       options?: IEachInFindOptions) => {
  console.log(`entering with collection", collection`)
  if (!isObject(queryObj)) {
    queryObj = {}
  }
  if (collection != null && !Array.isArray(collection)) {
    collection = [collection]
  }
  const pageSize: any = get(options, "pageSize", 5)
  console.log("Trying to iterate", collection)
  for (const col of collection) {
    let gotMorePages = true
    let currentPage = 0
    let res
    while (gotMorePages) {
      const queryWith = cloneDeep(queryObj)
      queryWith.$limit = pageSize
      queryWith.$skip = pageSize * currentPage
      const findRes = await findMethod(col, queryWith)
      if (findRes != null) {
        if (isArray(findRes.data)) {
          for (const e of findRes.data) {
            e.fromCollection = col
            res = await iterator(e)
          }
        }
        currentPage++
        if (currentPage >= findRes.total / pageSize) {
          gotMorePages = false
        }
      } else {
        gotMorePages = false
      }
    }
    return res
  }
}

export default iterateEachInFind
