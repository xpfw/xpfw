import { registerComponents }from "@xpfw/form-native"
import { ComponentRegistry } from "@xpfw/form-shared"
import { tests } from "@xpfw/ui-tests"
import { FieldType } from "@xpfw/validate"
import "isomorphic-fetch"
import NativeRelationshipMulti from "./relationshipMulti"
import NativeRelationshipSingle from "./relationshipSingle"
registerComponents()
ComponentRegistry.registerComponent(FieldType.RelationshipSingle, NativeRelationshipSingle)
ComponentRegistry.registerComponent(FieldType.RelationshipMulti, NativeRelationshipMulti)

tests.relationship()
