import { registerComponents } from "@xpfw/form-bulma"
import { ComponentRegistry } from "@xpfw/form-shared"
import { tests } from "@xpfw/ui-tests"
import { FieldType } from "@xpfw/validate"
import "isomorphic-fetch"
import WebRelationshipMulti from "./relationshipMulti"
import WebRelationshipSingle from "./relationshipSingle"

registerComponents()

ComponentRegistry.registerComponent(FieldType.RelationshipSingle, WebRelationshipSingle)
ComponentRegistry.registerComponent(FieldType.RelationshipMulti, WebRelationshipMulti)

tests.relationship(null)
