import { createTest } from "@xpfw/data-tests"
import { registerComponents } from "@xpfw/form-bulma"
import "isomorphic-fetch"
import BulmaCreate from "./create"

registerComponents()

createTest(BulmaCreate)
