/**
 * prefixMaker ensures that a string ends in a dot
 * This is done so that prefixed values are saved in an own object inside of e.g. FormStore
 * @param prefix
 */
const prefixMaker = (prefix?: string) => {
  return prefix && prefix.length > 0 ? prefix + "." : ""
}

export default prefixMaker
