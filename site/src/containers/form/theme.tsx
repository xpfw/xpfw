import { ComponentRegistry, IFieldProps, memo, useFieldWithValidation, getLabelFromProps } from "@xpfw/form"
import { toJS } from "mobx"
import { observer } from "mobx-react"
import * as React from "react"

const GuidedNumbersField: React.FunctionComponent<IFieldProps> = observer((props) => {
  const fieldProps = useFieldWithValidation(props.schema, props.mapTo, props.prefix)
  console.log("IN RENDER WITH FIELD", toJS(fieldProps))
  const memoVals = [props.mapTo, props.prefix, JSON.stringify(props.schema)]
  const randomize = memo(() => () => fieldProps.setValue(Math.round(Math.random() * 100)), memoVals)
  React.useEffect(randomize, memoVals)
  return (
    <div className="is-flex centerJustify has-text-centered is-size-5 marginTop marginBottom">
      <a className="button" onClick={() => {
        fieldProps.setValue(fieldProps.value - 1)
      }}>Decrease</a>
      <span style={{marginRight: "1rem", marginLeft: "1rem"}}>Value of <i>{getLabelFromProps(props)}</i> is: <b>{fieldProps.value}</b></span>
      <a className="button" onClick={() => {
        fieldProps.setValue(fieldProps.value + 1)
      }}>Increase</a><a style={{marginLeft: "1rem"}} className="button" onClick={randomize}>Randomize</a>
    </div>
  )
})

ComponentRegistry.registerComponent("number", GuidedNumbersField, "guided")
