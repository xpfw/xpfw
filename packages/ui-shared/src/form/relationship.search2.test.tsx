import { ComponentRegistry } from "@xpfw/form-shared"
import { tests } from "@xpfw/ui-tests"
import { FieldType } from "@xpfw/validate"
import "isomorphic-fetch"
import makeMockElement from "../testUtil/makeMockElement"
import RelationShipWrapper from "./relationship"

const MockEle: any = makeMockElement("mymock")
const MockedRelationship = RelationShipWrapper(MockEle)
ComponentRegistry.registerComponent(FieldType.RelationshipSingle, MockedRelationship)
ComponentRegistry.registerComponent(FieldType.RelationshipMulti, MockedRelationship)

tests.relationship(null)
