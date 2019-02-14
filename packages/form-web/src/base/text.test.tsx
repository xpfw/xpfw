import { ComponentRegistry, SharedField } from "@xpfw/form"
import { DateField, NameField, PwField, stringTest } from "@xpfw/form-tests"
import { set } from "lodash"
import * as MockDate from "mockdate"
import * as React from "react"
import render from "../testUtil/render"
import TextField, { setDate } from  "./text"
import { setFromEvent } from "./valueUtil"
MockDate.set(new Date(2011, 4, 5, 16, 20, 42, 1337))

ComponentRegistry.registerComponent("string", TextField)
ComponentRegistry.registerComponent("number", TextField)

test("Text Field Test", stringTest)
