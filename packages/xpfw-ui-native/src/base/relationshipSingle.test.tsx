import { registerComponents }from "@xpfw/form-native"
import { ComponentRegistry } from "@xpfw/form"
import { relationshipTest } from "@xpfw/data-tests"
import NativeRelationshipMulti from "./relationshipMulti"
import NativeRelationshipSingle from "./relationshipSingle"
import "isomorphic-fetch"
registerComponents()

ComponentRegistry.registerComponent("string", NativeRelationshipSingle, "single")
ComponentRegistry.registerComponent("array", NativeRelationshipMulti, "multi")

relationshipTest()