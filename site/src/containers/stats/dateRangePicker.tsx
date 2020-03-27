import { TimeBeginField, TimeEndField } from "@xpfw/dm-shared"
import { SharedField } from "@xpfw/form"
import { map } from "lodash"
import * as React from "react"
import { dates, setToDate } from "./pickerHelpers"

class WebDateRangePicker extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <div className="inline">
          <SharedField schema={TimeBeginField} />
          <SharedField schema={TimeEndField} />
        </div>
        <div className="has-text-centered"><b>Presets</b></div>
        <div className="buttons has-addons">
          {map(dates, (date, key) => (
            <a
              key={key}
              className="button flex1 is-info is-outlined"
              onClick={setToDate.bind(this, date)}
            >
              {key}
            </a>
          ))}
        </div>
      </div>
    )
  }
}

export default WebDateRangePicker
