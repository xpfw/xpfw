import { ComponentRegistry, FormStore, SharedField } from "@xpfw/form-shared"
import { tests } from "@xpfw/form-tests"
import {  FieldType, IField } from "@xpfw/validate"
import { set } from "lodash"
import * as MockDate from "mockdate"
import * as React from "react"
import render from "../testUtil/render"
import TextField, { setDate } from  "./text"
import { setFromEvent } from "./valueUtil"
MockDate.set(new Date(2011, 4, 5, 16, 20, 42, 1337))

ComponentRegistry.registerComponent(FieldType.Text, TextField)
ComponentRegistry.registerComponent(FieldType.Number, TextField)
ComponentRegistry.registerComponent(FieldType.Date, TextField)
ComponentRegistry.registerComponent(FieldType.Password, TextField)
ComponentRegistry.registerComponent(FieldType.Slider, TextField)

test("Text Field Test", tests.text)
