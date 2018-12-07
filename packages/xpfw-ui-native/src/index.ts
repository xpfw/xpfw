import { ComponentRegistry } from "@xpfw/form-shared"
import { FieldType } from "@xpfw/validate"
import RelationshipMulti from "./base/relationshipMulti"
import RelationshipSingle from "./base/relationshipSingle"

const registerComponents = (PassedComponentRegistry: any = ComponentRegistry) => {
  PassedComponentRegistry.registerComponent(FieldType.RelationshipSingle, RelationshipSingle)
  PassedComponentRegistry.registerComponent(FieldType.RelationshipMulti, RelationshipMulti)
}

export {
  registerComponents
}
