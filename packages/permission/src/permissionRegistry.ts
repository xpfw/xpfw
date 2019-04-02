import { IPermissionSchema } from "./permissionSchema"

export class PermissionRegistryClass {
  public permissions: {[index: string]: IPermissionSchema | undefined} = {}
  public getPermission = (collection: string) => this.permissions[collection]
  public registerPermission = (collection: string, schema: IPermissionSchema) => this.permissions[collection] = schema
}

const PermissionRegistry = new PermissionRegistryClass()

export default PermissionRegistry
