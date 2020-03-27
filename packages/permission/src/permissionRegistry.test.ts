import { IPermissionSchema } from "./permissionSchema"
import PermissionRegistry from "./permissionRegistry"

describe("PermissionRegistry Test", () => {
  it("get and register permission", () => {
    const col = "blub"
    const s: IPermissionSchema = {disableAdminOverride: true}
    expect(PermissionRegistry.getPermission(col)).toBe(undefined)
    PermissionRegistry.registerPermission(col, s)
    expect(PermissionRegistry.getPermission(col)).toBe(s)
  })
})
