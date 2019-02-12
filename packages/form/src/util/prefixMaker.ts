import { memoize } from "lodash-es"

/**
 * prefixMaker ensures that a string ends in a dot
 * This is done so that prefixed values are saved in an own object inside of e.g. FormStore
 * @param prefix
 */
const prefixMaker = memoize((prefix?: string) => {
  return prefix && prefix.length > 0 ? prefix + "." : ""
})

/**
 * Prepend a prefix if provided
 * This is done so that prefixed values are saved in an own object inside of e.g. FormStore
 * @param prefix
 */
const prependPrefix = memoize((mapTo: string, prefix?: string) => {
  return `${prefixMaker(prefix)}${mapTo}`
})

export default prefixMaker
export {
  prependPrefix
}
