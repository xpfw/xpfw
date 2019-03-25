import { relationshipTest } from "@xpfw/data-tests"
import { ComponentRegistry } from "@xpfw/form"
import { registerComponents } from "@xpfw/form-bulma"
import "isomorphic-fetch"
import WebRelationshipMulti from "./relationshipMulti"
import WebRelationshipSingle from "./relationshipSingle"

registerComponents()

ComponentRegistry.registerComponent("string", WebRelationshipSingle, "single")
ComponentRegistry.registerComponent("array", WebRelationshipMulti, "multi")

relationshipTest.relationship(null)
