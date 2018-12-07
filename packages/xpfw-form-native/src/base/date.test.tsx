import { ComponentRegistry, FormStore, SharedField } from "@xpfw/form-shared"
import { tests } from "@xpfw/form-tests"
import {  FieldType, IField } from "@xpfw/validate"
import { set } from "lodash"
import * as MockDate from "mockdate"
import * as React from "react"
import render from "../testUtil/render"
import DateField from  "./date"
MockDate.set(new Date(2011, 4, 5, 16, 20, 42, 1337))

ComponentRegistry.registerComponent(FieldType.Date, DateField)

tests.date(DateField)
