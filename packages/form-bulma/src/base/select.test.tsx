import { ComponentRegistry } from "@xpfw/form"
import { selectTest } from "@xpfw/form-tests"
import SelectField from "./select"

ComponentRegistry.registerComponent("string", SelectField)
ComponentRegistry.registerComponent("number", SelectField)

test("Select Field Test", selectTest)
