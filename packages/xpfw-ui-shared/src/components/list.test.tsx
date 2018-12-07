import { tests } from "@xpfw/ui-tests"
import "isomorphic-fetch"
import makeMockElement from "../testUtil/makeMockElement"
import { nextPage, prevPage, onUpdate} from "./list"

tests.list(makeMockElement("mymock"), nextPage, prevPage, onUpdate)