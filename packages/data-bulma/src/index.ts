import { ComponentRegistry } from "@xpfw/form"
import BulmaCreate from "./components/create"
import BulmaEdit from "./components/edit"
import BulmaList from "./components/list"
import WebRelationshipMulti from "./components/relationshipMulti"
import WebRelationshipSingle from "./components/relationshipSingle"
import BulmaRemove from "./components/remove"

const registerComponents = () => {
  const single: any = WebRelationshipSingle
  const multi: any = WebRelationshipMulti
  ComponentRegistry.registerComponent("string", single, "single")
  ComponentRegistry.registerComponent("array", multi, "multi")
}

export {
  WebRelationshipSingle, WebRelationshipMulti, registerComponents, BulmaCreate,
  BulmaEdit, BulmaList, BulmaRemove
}
