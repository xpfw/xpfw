import { ComponentRegistry } from "@xpfw/form"
import { arrayTest } from "@xpfw/form-tests"
import ArrayField from "./array"
import TextField from "./text"

ComponentRegistry.registerComponent("array", ArrayField)
ComponentRegistry.registerComponent("string", TextField)
ComponentRegistry.registerComponent("number", TextField)

test("Array Field Test", arrayTest)
