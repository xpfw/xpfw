import { tests } from "@xpfw/ui-tests"
import "isomorphic-fetch"
import makeMockElement from "../testUtil/makeMockElement"
import { submitRemove } from "./remove"

tests.remove(makeMockElement("mymock"), submitRemove)
