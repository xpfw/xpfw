const StatRegistry: {
  [index: string]: any
  register: (id: string, newVal: any) => void
} = {
  register: (id, newVal) => {
    StatRegistry[id] = newVal
  }
}

export default StatRegistry
