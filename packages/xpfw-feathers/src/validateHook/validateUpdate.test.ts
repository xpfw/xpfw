import { TestDefs } from "@xpfw/validate"
import { cloneDeep } from "lodash"
import * as MockDate from "mockdate"
import { ObjectID } from "mongodb"
const FormNumberAndRequiredText = TestDefs.FormNumberAndRequiredText
import clearService from "../testUtil/clearService"
import getRandomApp from "../testUtil/getRandomApp"
import matchHookError from "../testUtil/matchHookError"
import stripId from "../testUtil/stripId"
import validateCreate from "./validateCreate"
import validateUpdate from "./validateUpdate"

MockDate.set(new Date(2310, 12, 2))

test("verify func", async () => {
  const { app, service, cleanUpDb } = await getRandomApp("validateUpdate", true)
  await clearService(service)
  service.hooks({
    before: {
      create: [validateCreate(FormNumberAndRequiredText)],
      update: [validateUpdate(FormNumberAndRequiredText)]
    }
  })
  const creationResult = await service.create({
    myString: "obj", filtered: "out", of: 32, the: ["o", "b", "j", "ct"]
  })
  const newObjectId = creationResult._id
  expect(stripId(creationResult)).toMatchSnapshot("result of creation")

  expect(stripId(await service.update(newObjectId, {myString: "changed"})))
  .toMatchSnapshot("Valid Update gets persisted")

  await matchHookError(service.update(newObjectId, {myString: 424}), "Invalid Type for updated string")

  await matchHookError(
    service.update(newObjectId, {
      inv: 424, ali: true, de: "asd"
    }),
    "Fully Invalid Update Document"
  )

  await cleanUpDb()
})
