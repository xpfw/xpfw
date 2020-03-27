import { ComponentRegistry } from "@xpfw/form"
import { objectTest } from "@xpfw/form-tests"
import ObjectField from "./object"
import TextField from "./text"

ComponentRegistry.registerComponent("string", TextField)
ComponentRegistry.registerComponent("number", TextField)
ComponentRegistry.registerComponent("object", ObjectField)

test("Object Field Test", objectTest)
