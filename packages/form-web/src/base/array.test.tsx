import { ComponentRegistry } from "@xpfw/form"
import { arrayTest } from "@xpfw/form-tests"
import ArrayField from "./array"
import TextField from "./text"

ComponentRegistry.registerComponent("array", ArrayField)
ComponentRegistry.registerComponent("text", TextField)

test("Array Field Test", arrayTest)
