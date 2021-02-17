import { ComponentRegistry } from "@xpfw/form"
import { stringTest } from "@xpfw/form-tests"
import MockDate from "mockdate"
import TextField, { setDate } from  "./text"
MockDate.set(new Date(2011, 4, 5, 16, 20, 42, 1337))

ComponentRegistry.registerComponent("string", TextField)
ComponentRegistry.registerComponent("number", TextField)

test("Text Field Test", stringTest)
