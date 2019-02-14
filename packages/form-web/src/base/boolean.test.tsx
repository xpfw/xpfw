import { ComponentRegistry } from "@xpfw/form"
import { booleanTest } from "@xpfw/form-tests"
import BooleanField from "./boolean"

ComponentRegistry.registerComponent("boolean", BooleanField)

test("Boolean Field Test", booleanTest)
