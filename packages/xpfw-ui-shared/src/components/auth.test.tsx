import { tests } from "@xpfw/ui-tests"
import "isomorphic-fetch"
import makeMockElement from "../testUtil/makeMockElement"
import { submitLogin, submitLogout, submitRegister } from "./auth"

tests.auth(makeMockElement("mymock"), submitLogin, submitLogout, submitRegister)
