const data: any = {}

const getMemo = (functionArguments: any[]) => {
  let foundValue: any
  let i = 0
  for (const argument of functionArguments) {
    if (i === 0) {
      i++
      foundValue = data[argument]
    } else if (foundValue != null && foundValue[argument] != null) {
      foundValue = foundValue[argument]
    } else {
      foundValue = null
    }
  }
  return foundValue
}

const setMemo = (value: any, functionArguments: any[]) => {
  let foundValue = data
  let i = 0
  for (const argument of functionArguments) {
    i++
    if (foundValue[argument] == null) {
      foundValue[argument] = {}
    }
    if (functionArguments.length === i) {
      foundValue[argument] = value
    } else {
      foundValue = foundValue[argument]
    }
  }
  return foundValue
}

const memo = (originalFunction: Function, functionArguments: any[]) => {
  let value = getMemo(functionArguments)
  if (value != null) {
    return value
  }
  value = originalFunction()
  setMemo(value, functionArguments)
  return value
}

export default memo
