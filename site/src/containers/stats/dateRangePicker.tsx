import { TimeBeginField, TimeEndField } from "@xpfw/dm-shared"
import { FormStore, SharedField } from "@xpfw/form-shared"
import { dates, setToDate } from "./pickerHelpers"
import { each, get, map } from "lodash"
import * as React from "react"

class WebDateRangePicker extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <div className="inline">
          <SharedField field={TimeBeginField} />
          <SharedField field={TimeEndField} />
        </div>
        <div className="has-text-centered"><b>Presets</b></div>
        <div className="buttons has-addons">
          {map(dates, (date, key) => (
            <a
              key={key}
              className="button flex1 is-info is-outlined"
              onClick={setToDate.bind(this, date)}
            >{key}</a>
          ))}
        </div>
      </div>
    )
  }
}

export default WebDateRangePicker
