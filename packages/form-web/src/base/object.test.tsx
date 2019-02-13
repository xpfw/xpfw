import { ComponentRegistry } from "@xpfw/form-shared"
import { tests } from "@xpfw/form-tests"
import { FieldType } from "@xpfw/validate"
import ObjectField from "./object"
import TextField from "./text"

ComponentRegistry.registerComponent(FieldType.Text, TextField)
ComponentRegistry.registerComponent(FieldType.Number, TextField)
ComponentRegistry.registerComponent(FieldType.Object, ObjectField)

test("Object Field Test", tests.object)
