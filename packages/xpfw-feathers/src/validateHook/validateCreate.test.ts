import { TestDefs } from "@xpfw/validate"
const FormNumberAndRequiredText = TestDefs.FormNumberAndRequiredText
import getRandomApp from "../testUtil/getRandomApp"
import validateCreate from "./validateCreate"

test("verify func", async () => {
  const { app, service } = await getRandomApp("validateCreate")

  service.hooks({before: {create: [validateCreate(FormNumberAndRequiredText)]}})

  await expect(service.create({
    myString: "obj", myNum: 321, filtered: "out", of: 32, the: ["o", "b", "j", "ct"]
  })).resolves.toMatchSnapshot("result of creation")

  await expect(service.create({
    myString: "obj", myNum: 321, filtered: "out", of: 32, the: ["o", "b", "j", "ct"]
  }, {user: {_id: {toString: () => "hi"}}})).resolves.toMatchSnapshot("get userid")
  await expect(service.create({missing: "required", string: "inhere"}))
  .rejects.toMatchSnapshot("Invalid Object validated")
})
