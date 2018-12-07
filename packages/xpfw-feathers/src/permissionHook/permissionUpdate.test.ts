import { TestDefs } from "@xpfw/validate"
const FormWithPermissionsOnFieldsAndGeneralPerms = TestDefs.FormWithPermissionsOnFieldsAndGeneralPerms
import getRandomApp from "../testUtil/getRandomApp"
import permissionUpdate from "./permissionUpdate"

test("verify func", async () => {
  const serviceName = "permissionUpdate"
  const { app, service } = await getRandomApp(serviceName)
  const updatePermHook = permissionUpdate(FormWithPermissionsOnFieldsAndGeneralPerms, {
    idPath: "id", directOwnershipPath: "belongsTo", serviceName
  })
  service.hooks({before: {update: [ updatePermHook ], patch: [ updatePermHook ]}})

  const owningUserId = "asdf"
  const creationResultId = await service.create({missing: "required", belongsTo: owningUserId},
    {user: {_id: owningUserId}})
  expect(creationResultId).toMatchSnapshot("result of successfull creation")

  await expect(service.update(creationResultId.id, {bla: "la"})).rejects.toMatchSnapshot("Forbidden Update")
  await expect(service.patch(creationResultId.id, {bla: "la"})).rejects.toMatchSnapshot("Forbidden Update")
  await expect(service.patch(creationResultId.id, {bla: "la"}, {user: {id: owningUserId}}))
  .resolves.toMatchSnapshot("Allowed patch")
  await expect(service.update(creationResultId.id, {bla: "la", belongsTo: "notme"}, {user: {id: owningUserId}}))
  .resolves.toMatchSnapshot("Allowed Update")
  await expect(service.patch(creationResultId.id, {bla: "la"}))
  .rejects.toMatchSnapshot("Forbidden Update after destroying belongsTo")
})
