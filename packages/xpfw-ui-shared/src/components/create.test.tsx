import { tests } from "@xpfw/ui-tests"
import "isomorphic-fetch"
import makeMockElement from "../testUtil/makeMockElement"
import SharedFormCreate, { submitCreate } from "./create"

tests.create(makeMockElement("mymock"), submitCreate)
