import { isNil, isString, set } from "lodash"
import * as React from "react"
import { IFieldProps } from "./components/field"

export class ComponentRegistry {
  public themedComponents: {[index: string]: {[index: string]: any}} = {}
  public getComponent(type: number | string, theme: string = "default"): React.ComponentType<any> | undefined {
    let component: any
    if (isString(theme) && !isNil(this.themedComponents[theme]) && !isNil(this.themedComponents[theme][type])) {
      component = this.themedComponents[theme][type]
    }
    if (isNil(component) && !isNil(this.themedComponents.default)) {
      component = this.themedComponents.default[type]
    }
    return component
  }
  public registerComponent(type: number | string,
                           component: React.ComponentType<IFieldProps>,
                           theme: string = "default") {
    if (isNil(this.themedComponents[theme])) {
      this.themedComponents[theme] = {}
    }
    this.themedComponents[theme][type] = component
  }
}

const globalRegistry = new ComponentRegistry()

export default globalRegistry
