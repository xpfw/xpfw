import { tests } from "@xpfw/ui-tests"
import "isomorphic-fetch"
import makeMockElement from "../testUtil/makeMockElement"
import { submitEdit } from "./edit"

tests.edit(makeMockElement("mymock"), submitEdit)
