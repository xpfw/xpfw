import * as React from "react"
import { JSONSchemaDefinition } from "../jsonschema"

export interface IFieldProps {
  mapTo: string
  prefix?: string
  schema: JSONSchemaDefinition
}

export class ComponentRegistryClass {
  public themedComponents: {[index: string]: {[index: string]: any}} = {}
  public getComponent<T>(type: number | string, theme: string = "default"):
  React.ComponentType<IFieldProps & T> | undefined {
    let component: any
    if (theme != null && this.themedComponents[theme] != null && this.themedComponents[theme][type] != null) {
      component = this.themedComponents[theme][type]
    } else if (this.themedComponents.default != null) {
      component = this.themedComponents.default[type]
    }
    return component
  }
  public registerComponent(type: number | string,
                           component: React.ComponentType<IFieldProps>,
                           theme: string = "default") {
    if (this.themedComponents[theme] == null) {
      this.themedComponents[theme] = {}
    }
    this.themedComponents[theme][type] = component
  }
}

const ComponentRegistry = new ComponentRegistryClass()

export default ComponentRegistry
