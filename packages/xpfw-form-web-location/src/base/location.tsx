import { IFieldProps } from "@xpfw/form-shared"
import * as leaflet from "leaflet"
import { isNil } from "lodash"
import * as React from "react"

const handleLatLng = (thisRef: any) => {
  return (e: any) => {
    const getFrom = e.latlng
    thisRef.props.setValue([getFrom.lng, getFrom.lat])
  }
}

const valToLatLng: any = (val: any) => {
  if (isNil(val)) {
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

class WebMapField extends React.Component<IFieldProps & {
  width?: number
  height?: number
}, any> {
  private handleClick: any
  private map: any
  private marker: any
  constructor(props: any) {
    super(props)
    this.handleClick = handleLatLng(this)
  }
  public makeMapId() {
    return `map${this.props.prefix}${this.props.field.mapTo}`
  }
  public createMarker() {
    const bla: any = valToLatLng(this.props.value)
    this.marker = leaflet.marker(bla, {icon: leafletIcon}).addTo(this.map)
  }
  public updateMarker() {
    if (isNil(this.marker)) {
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
    if (!isNil(this.marker)) {
      this.marker.remove()
    }
    if (!isNil(this.map)) {
      this.map.remove()
    }
  }
  public render() {
    let style = this.props.style
    if (isNil(style)) {
      style = {minHeight: "200pt"}
    }
    return (
      <div
        id={this.makeMapId()}
        style={style}
      />
    )
  }
}

export default WebMapField
export {
  loadResources, valToLatLng, handleLatLng
}
