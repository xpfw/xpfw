import { ComponentRegistry } from "@xpfw/form-shared"
import { FieldType } from "@xpfw/validate"
import BulmaCreate from "./components/create"
import BulmaEdit from "./components/edit"
import BulmaList from "./components/list"
import WebRelationshipMulti from "./components/relationshipMulti"
import WebRelationshipSingle, {
  ISharedRelationshipField, ISharedRelationshipFieldProps
} from "./components/relationshipSingle"
import BulmaRemove from "./components/remove"

const registerComponents = () => {
  const single: any = WebRelationshipSingle
  const multi: any = WebRelationshipMulti
  ComponentRegistry.registerComponent(FieldType.RelationshipSingle, single)
  ComponentRegistry.registerComponent(FieldType.RelationshipMulti, multi)
}

export {
  WebRelationshipSingle, WebRelationshipMulti, registerComponents,
  ISharedRelationshipField, ISharedRelationshipFieldProps, BulmaCreate,
  BulmaEdit, BulmaList, BulmaRemove
}
