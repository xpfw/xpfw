import { ensureDate, getTimeSteps } from "@xpfw/dm"
import { FormStore } from "@xpfw/form-shared"
import { DbStore } from "@xpfw/ui-shared"
import { IField, IFieldError, IForm, prefixMaker, StatType, ValidationRegistry } from "@xpfw/validate"
import { find, get, isNil } from "lodash"
import * as momentA from "moment"
import * as React from "react"
import { ComponentBase } from "resub"
import StatStore from "../store/stat"
import { TimeBeginField, TimeEndField } from "./fields"
const moment: any = momentA

export interface ISharedStat extends React.Props<any> {
  configId: string
  collection: string
  useServer?: boolean
  prefix?: string
}

export interface ISharedStatState {
  stat: any
}

const SharedStatWrapper: any = (Container: React.ComponentType<any>) => {
  return class extends ComponentBase<any, any> {
    public constructor(props: any) {
      super(props)
    }
    public render() {
      return <Container {...this.props} {...this.state} />
    }
    protected _buildState(props: any, initialBuild: boolean): any {
      const chartConfigs = get(ValidationRegistry.forms, `${props.collection}.stats`)
      const config = find(chartConfigs, ["id", props.configId])
      const query: any = {}
      if (config.type === StatType.timeStep) {
        const gte: any = FormStore.getValue(prefixMaker(props.prefix) + TimeBeginField.mapTo)
        const lte: any = FormStore.getValue(prefixMaker(props.prefix) + TimeEndField.mapTo)
        query.createdAt = {
          $gte: ensureDate(gte),
          $lte: ensureDate(lte)
        }
      }
      const stat: any = StatStore.getStat(
        `${prefixMaker(props.prefix)}${props.collection}.${props.configId}`,
        props.collection, config, query, props.useServer)
      return {
        stat, config, query
      }
    }
  }
}

export default SharedStatWrapper
