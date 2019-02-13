import { ComponentRegistry } from "@xpfw/form-shared"
import { tests } from "@xpfw/form-tests"
import { FieldType } from "@xpfw/validate"
import SelectField from "./select"
ComponentRegistry.registerComponent(FieldType.Select, SelectField)

test("Select Field Test", tests.select)
