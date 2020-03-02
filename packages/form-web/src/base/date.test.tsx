import { ComponentRegistry } from "@xpfw/form"
import { dateTest } from "@xpfw/form-tests"
import * as MockDate from "mockdate"
import TextField, { setDate } from  "./text"
MockDate.set(new Date(2011, 4, 5, 16, 20, 42, 1337))

ComponentRegistry.registerComponent("string", TextField)
ComponentRegistry.registerComponent("number", TextField)

test("Date Field Test", dateTest)
