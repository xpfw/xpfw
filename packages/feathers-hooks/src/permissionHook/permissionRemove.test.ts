import { Permission } from "@xpfw/permission"
import getRandomApp from "../testUtil/getRandomApp"
import permissionRemove from "./permissionRemove"

test("verify func", async () => {
  const serviceName = "permissionRemove"
  const { app, service } = await getRandomApp(serviceName)
  const removePermHook = permissionRemove({required: {create: Permission.Public, remove: Permission.Owner}}, {
    idPath: "id", directOwnershipPath: "belongsTo", serviceName
  })
  service.hooks({before: {remove: [ removePermHook ]}})

  const owningUserId = "asdf"
  const creationResultId = await service.create({missing: "required", belongsTo: owningUserId},
    {user: {_id: owningUserId}})
  expect(creationResultId).toMatchSnapshot("result of successfull creation")

  await expect(service.remove(creationResultId.id)).rejects.toMatchSnapshot("Forbidden remove")
  await expect(service.remove(creationResultId.id, {user: {id: owningUserId}}))
  .resolves.toMatchSnapshot("Allowed remove")
})
