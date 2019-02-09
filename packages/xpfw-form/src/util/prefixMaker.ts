const prefixMaker = (prefix?: string) => {
  return prefix && prefix.length > 0 ? prefix + "." : ""
}

export default prefixMaker
