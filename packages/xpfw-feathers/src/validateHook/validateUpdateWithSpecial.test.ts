import { TestDefs } from "@xpfw/validate"
import { cloneDeep, set } from "lodash"
import * as MockDate from "mockdate"
import { ObjectID } from "mongodb"
const FormForUpdateTest = TestDefs.FormForUpdateTest
const NumberFieldNested = TestDefs.NumberFieldNested
import getRandomApp from "../testUtil/getRandomApp"
import matchHookError from "../testUtil/matchHookError"
import stripId from "../testUtil/stripId"
import validateCreate from "./validateCreate"
import validateUpdate from "./validateUpdate"

MockDate.set(new Date(2310, 12, 2))

test("verify func", async () => {
  const { app, service, cleanUpDb } = await getRandomApp("validateUpdateWithSpecialParams", true)
  await service.remove(null, {})
  service.hooks({
    before: {
      create: [validateCreate(FormForUpdateTest)],
      update: [validateUpdate(FormForUpdateTest, true)]
    }
  })
  const createObj = {}
  set(createObj, NumberFieldNested.mapTo, 324)
  const creationResult = await service.create(createObj)
  const newObjectId = creationResult._id
  expect(stripId(creationResult)).toMatchSnapshot("result of creation")

  expect(stripId(await service.update(newObjectId, {$inc: {[NumberFieldNested.mapTo]: 234}})))
  .toMatchSnapshot("Valid Update via special query persisted")

  await cleanUpDb()
})
