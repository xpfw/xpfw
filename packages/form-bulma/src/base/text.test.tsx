import { ComponentRegistry, FormStore, SharedField } from "@xpfw/form"
import { stringTest } from "@xpfw/form-tests"
import { set } from "lodash"
import MockDate from "mockdate"
import * as React from "react"
import render from "../testUtil/render"
import TextField from  "./text"

MockDate.set(new Date(2011, 4, 5, 16, 20, 42, 1337))

ComponentRegistry.registerComponent("string", TextField)
ComponentRegistry.registerComponent("number", TextField)
ComponentRegistry.registerComponent("date", TextField)

test("Text Field Test", stringTest)
