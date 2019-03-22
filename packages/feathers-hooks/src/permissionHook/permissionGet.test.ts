import { Permission } from "@xpfw/permission"
import getRandomApp from "../testUtil/getRandomApp"
import permissionGet from "./permissionGet"

test("verify func", async () => {
  const serviceName = "permissionGet"
  const { app, service } = await getRandomApp(serviceName)
  const GetPermHook = permissionGet({required: {create: Permission.Public, get: Permission.Owner}}, {
    idPath: "id", directOwnershipPath: "belongsTo", serviceName
  })
  service.hooks({before: {get: [ GetPermHook ]}})

  const owningUserId = "asdf"
  const creationResultId = await service.create({missing: "required", belongsTo: owningUserId},
    {user: {_id: owningUserId}})
  expect(creationResultId).toMatchSnapshot("result of successfull creation")

  await expect(service.get(creationResultId.id)).rejects.toMatchSnapshot("Forbidden get")
  await expect(service.get(creationResultId.id, {user: {id: owningUserId}}))
  .resolves.toMatchSnapshot("Allowed get")
})
