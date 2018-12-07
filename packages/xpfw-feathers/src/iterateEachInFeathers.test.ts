import { TestDefs } from "@xpfw/validate"
const FormNumberAndRequiredText = TestDefs.FormNumberAndRequiredText
import iterateEachInFeathers from "./iterateEachInFeathers"
import getRandomApp from "./testUtil/getRandomApp"
import validateCreate from "./validateHook/validateCreate"

test("verify func", async () => {
  const collectionName = "iterateEach"
  const { app, service } = await getRandomApp(collectionName)

  service.hooks({before: {create: [validateCreate(FormNumberAndRequiredText)]}})
  for (let i = 0; i < 160; i++) {
    await service.create({
      myString: "obj", myNum: i * 3 / 2, filtered: "out", of: i * 432, the: ["o", "b", "j", "ct"]
    })
  }
  const found: any = []
  await iterateEachInFeathers(app, collectionName, {}, (res: any) => {
    found.push(res)
    return Promise.resolve()
  })
  expect(found).toMatchSnapshot("iterateAll")
})
