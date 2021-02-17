import { ExtendedJSONSchema, getMapToFromProps, IFieldProps, useField } from "@xpfw/form"
import leaflet from "leaflet"
import { get } from "lodash"
import { observer } from "mobx-react"
import * as React from "react"

const handleLatLng = (thisRef: any) => {
  return (e: any) => {
    const getFrom = e.latlng
    thisRef.props.setValue([getFrom.lng, getFrom.lat])
  }
}

const valToLatLng: any = (val: any) => {
  if (val == null) {
    return [52.1513, 4.4826]
  }
  return [val[1], val[0]]
}
let leafletIcon: any
const loadResources = () => {
  require("leaflet/dist/leaflet.css")
  leafletIcon = leaflet.icon({
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    iconSize: [25, 41],
    shadowSize: [41, 41],
    iconAnchor: [13, 41]
  })
}

class WebMapField extends React.Component<{
  schema: ExtendedJSONSchema,
  prefix?: string,
  value: any,
  width?: number
  height?: number
  setValue: any
}, any> {
  private handleClick: any
  private map: any
  private marker: any
  constructor(props: any) {
    super(props)
    this.handleClick = handleLatLng(this)
  }
  public makeMapId() {
    return `map${this.props.prefix}${this.props.schema.title}`
  }
  public createMarker() {
    const bla: any = valToLatLng(this.props.value)
    this.marker = leaflet.marker(bla, {icon: leafletIcon}).addTo(this.map)
  }
  public updateMarker() {
    if (this.marker == null) {
      this.createMarker()
    }
    this.marker.setLatLng(valToLatLng(this.props.value))
  }
  public componentDidUpdate() {
    this.updateMarker()
  }
  public componentDidMount() {
    this.map = leaflet.map(this.makeMapId()).setView(valToLatLng(this.props.value), 13)
    leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    }).addTo(this.map)
    this.map.on("click", this.handleClick)
  }
  public componentWillUnmount() {
    if (this.marker != null) {
      this.marker.remove()
    }
    if (this.map != null) {
      this.map.remove()
    }
  }
  public render() {
    const style = get(this.props, "style", {minHeight: "200pt"})
    return (
      <div
        id={this.makeMapId()}
        style={style}
      />
    )
  }
}

const WrapperForWebMapField: React.FunctionComponent<IFieldProps> = observer((props) => {
  const fieldHelper = useField(getMapToFromProps(props), props.prefix)
  return (
    <WebMapField
      value={fieldHelper.value}
      setValue={fieldHelper.setValue}
      schema={props.schema}
      prefix={props.prefix}
    />
  )
})

export default WrapperForWebMapField
export {
  loadResources, valToLatLng, handleLatLng
}
