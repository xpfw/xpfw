import { Permission } from "./permissionSchema"
import validatePermission from "./validatePermission"

const Method = {
  Create:  "create"
}

const untypedValidatePermission: any = validatePermission
const myCustomPermission = -420
describe("Permission Tests", () => {
  const makePerm: any = (perm: any, method: any) => {
    return {
      permissions: {
        required: {
          [method]: perm
        }
      },
      method
    }
  }
  it("Server and Admin type", async () => {
    expect(await untypedValidatePermission(
      null, makePerm(Permission.Server, Method.Create)
    )).toBe(false, "Server with user null is false")
    expect(await untypedValidatePermission(
      {_id: Permission.Server}, makePerm(Permission.Server, Method.Create)
    )).toBe(true, "Server with user wrong id is true")
  })
  it("user checks work as expected", async () => {
    expect(await untypedValidatePermission(
      null, makePerm(Permission.Public, Method.Create)
    )).toBe(true, "User Null and perm Guest is allowed")
    expect(await untypedValidatePermission(
      null, makePerm(Permission.User, Method.Create)
    )).toBe(false, "User Null and perm user isn't allowed")
    expect(await untypedValidatePermission(
      {_id: true}, makePerm(Permission.User, Method.Create)
    )).toBe(true, "User set and perm user is allowed")
  })
  it("owner checks work as expected", async () => {
    const userId = "myUserID"
    const docTester: any = makePerm(Permission.Owner, Method.Create)
    docTester.directOwnershipPath = "belongsTo"
    docTester.docId = userId
    expect(await untypedValidatePermission(
      {}, docTester
    )).toBe(true, "false because no owner")
    expect(await untypedValidatePermission(
      {_id: userId}, docTester
    )).toBe(true, "true because same id as object in question")
    docTester.doc = {belongsTo: userId}
    docTester.docId = "not this id"
    expect(await untypedValidatePermission(
      {_id: userId}, docTester
    )).toBe(true, "true because ownershipPath ID matches")
  })
  it("custom checks work as expected", async () => {
    const userId = "myUserID"
    const docTester: any = makePerm(Permission.Server, Method.Create)
    docTester.permissions = {disableAdminOverride: false}
    expect(await untypedValidatePermission(
      null, docTester
    )).toBe(false, "false because no permissions set")
    docTester.permissions.check = () => Promise.resolve(true)
    expect(await untypedValidatePermission(
      {_id: userId}, docTester
    )).toBe(true, "true because custom check says so ")
    docTester.permissions.check = () => Promise.resolve(false)
    expect(await untypedValidatePermission(
      {_id: userId}, docTester
    )).toBe(false, "false because custom check says so ")
  })
})
