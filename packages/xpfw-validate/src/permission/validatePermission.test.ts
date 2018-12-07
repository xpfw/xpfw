import { Method, Permission } from "../globals"
import { IPermissionsForForm } from "../typeDef"
import cleanUpDoc from "./cleanUpDoc"
import validatePermission from "./validatePermission"

const untypedValidatePermission: any = validatePermission
const myCustomPermission = -420
describe("Permission Tests", async () => {
  const makePerm = (perm, method) => {
    return {
      form: {
          permissions: {
          required: {
            [method]: perm
          }
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
      {_id: Permission.Admin}, makePerm(Permission.Server, Method.Create)
    )).toBe(false, "Server with user wrong id is false")
    expect(await untypedValidatePermission(
      {_id: Permission.Server}, makePerm(Permission.Server, Method.Create)
    )).toBe(true, "Server with user wrong id is true")
    expect(await untypedValidatePermission(
      {_id: Permission.Server}, makePerm(Permission.Admin, Method.Create)
    )).toBe(false, "Admin with user wrong id is false")
    expect(await untypedValidatePermission(
      {_id: Permission.Admin}, makePerm(Permission.Admin, Method.Create)
    )).toBe(true, "Admin with right id is true")
  })
  it("user checks work as expected", async () => {
    expect(await untypedValidatePermission(
      null, makePerm(Permission.Guest, Method.Create)
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
    docTester.form = {permissions: {disableAdminOverride: false}}
    expect(await untypedValidatePermission(
      null, docTester
    )).toBe(true, "true because no permissions set")
    docTester.form.permissions.check = () => Promise.resolve(true)
    expect(await untypedValidatePermission(
      {_id: userId}, docTester
    )).toBe(true, "true because custom check says so ")
    docTester.form.permissions.check = () => Promise.resolve(false)
    expect(await untypedValidatePermission(
      {_id: userId}, docTester
    )).toBe(false, "false because custom check says so ")
  })

  // untypedValidatePermission({_id: Permission.Server},  {}).then((res: any) => {
  //   expect(res).toBe(true)
  //   return untypedValidatePermission({_id: Permission.Admin})
  // }).then((res: any) => {
  //   expect(res).toBe(true)
  //   return untypedValidatePermission({_id: "a"}, {docId: "a"})
  // }).then((res: any) => {
  //   expect(res).toBe(true)
  //   return untypedValidatePermission({_id: "c"}, {docId: "a"})
  // }).then((res: any) => {
  //   expect(res).toBe(true)
  //   return untypedValidatePermission({}, {docId: "a"})
  // }).then((res: any) => {
  //   expect(res).toBe(true)
  //   return untypedValidatePermission({}, {
  //     form: {permissions: {check: () => Promise.resolve(true)
  //   }}})
  // }).then((res: any) => {
  //   expect(res).toBe(true)
  //   return untypedValidatePermission({}, {
  //     form: {permissions: {check: () => Promise.resolve(false)
  //   }}})
  // }).then((res: any) => {
  //   expect(res).toBe(false)
  //   return untypedValidatePermission({}, {
  //     form: {permissions: {check: () => Promise.resolve(null)
  //   }}})
  // }).then((res: any) => {
  //   expect(res).toBe(Permission.Guest)
  //   expect(cleanUpDoc()).toBeNull()
  //   expect(cleanUpDoc({"a.c.d": true}, {a: {c: {d: "gfd"}}}, true)).toMatchSnapshot("set flat")
  //   expect(cleanUpDoc({"a.c.d": true}, {a: {c: {d: "gfd"}}}, false)).toMatchSnapshot("not flat")
  // })
})
