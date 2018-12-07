import { TestDefs } from "@xpfw/validate"
const FormWithPermissionsOnFieldsAndGeneralPerms = TestDefs.FormWithPermissionsOnFieldsAndGeneralPerms
import getRandomApp from "../testUtil/getRandomApp"
import permissionCreate from "./permissionCreate"

test("verify func", async () => {
  const { app, service } = await getRandomApp("permissionCreate")

  service.hooks({before: {create: [permissionCreate(FormWithPermissionsOnFieldsAndGeneralPerms)]}})

  await expect(service.create({
    myString: "obj", filtered: "out", of: 32, the: ["o", "b", "j", "ct"]
  })).rejects.toMatchSnapshot("result of creation")

  await expect(service.create({missing: "required", string: "inhere"}, {user: {_id: "asdf"}}))
  .resolves.toMatchSnapshot("allowed to create because logged in")
})
