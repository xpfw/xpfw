import { SharedFormShow, IFormShowProps } from "@xpfw/ui-shared"
import {  IField } from "@xpfw/validate"
import { get, isNil } from "lodash"
import * as React from "react"

class BulmaShowUnwrapped extends React.Component<IFormShowProps, any> {
  public render() {
    return (
      <span>
        {JSON.stringify(this.props.item)}
      </span>
    )
  }
}

const BulmaShow: any = SharedFormShow<{}>(BulmaShowUnwrapped)

export default BulmaShow
