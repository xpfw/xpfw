const toDot = (path: any) => path.replace(/^\//, "").replace(/\//g, ".")

const jsonPatchToMongoDb = (patches: any[]) => {
  const update: any = {}
  patches.map((p) => {
    if (p.op === "replace" || p.op === "add") {
      if (!update.$set) { update.$set = {} }
      update.$set[toDot(p.path)] = p.value
    } else if (p.op === "remove") {
      if (!update.$unset) { update.$unset = {} }
      update.$unset[toDot(p.path)] = 1
    }
  })
  return update
}

export default jsonPatchToMongoDb
