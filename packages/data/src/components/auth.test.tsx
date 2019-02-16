import { authTest } from "@xpfw/data-tests"
import "isomorphic-fetch"
import makeMockElement from "../testUtil/makeMockElement"
import useAuth, { submitLogin, submitLogout, submitRegister } from "./auth"

authTest(makeMockElement("mymock", null, null, useAuth), submitLogin, submitLogout, submitRegister)
