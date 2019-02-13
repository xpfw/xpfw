import { ComponentRegistry } from "@xpfw/form-shared"
import { tests } from "@xpfw/form-tests"
import { FieldType  } from "@xpfw/validate"
import BooleanField from "./boolean"
ComponentRegistry.registerComponent(FieldType.Boolean, BooleanField)

test("Boolean Field Test", tests.boolean)
