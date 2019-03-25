import { ComponentRegistry } from "@xpfw/form"
import LocationField, { loadResources } from "./base/location"

const registerComponents = () => {
  ComponentRegistry.registerComponent("array", LocationField)
  loadResources()
}

export {
  registerComponents, LocationField, loadResources
}
