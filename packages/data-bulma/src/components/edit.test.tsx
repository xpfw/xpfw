import { editTest } from "@xpfw/data-tests"
import { registerComponents } from "@xpfw/form-bulma"
import "isomorphic-fetch"
import BulmaEdit from "./edit"

registerComponents()

editTest(BulmaEdit)
