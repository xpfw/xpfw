import { ComponentRegistry } from "@xpfw/form-shared"
import { FieldType } from "@xpfw/validate"
import LocationField, { loadResources } from "./base/location"

const registerComponents = () => {
  ComponentRegistry.registerComponent(FieldType.Location, LocationField)
  loadResources()
}

export {
  registerComponents, LocationField, loadResources
}
