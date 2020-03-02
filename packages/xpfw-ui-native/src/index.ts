import { ComponentRegistry } from "@xpfw/form"
import RelationshipMulti from "./base/relationshipMulti"
import RelationshipSingle from "./base/relationshipSingle"

const registerComponents = (PassedComponentRegistry: any = ComponentRegistry) => {
  const single: any = RelationshipSingle
  const multi: any = RelationshipMulti
  PassedComponentRegistry.registerComponent("string", single, "single")
  PassedComponentRegistry.registerComponent("array", multi, "multi")
}

export {
  registerComponents
}
