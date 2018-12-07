import * as React from "react"
import { RouterStore } from "@xpfw/router";
import { FaHome, FaCogs, FaWpforms, FaCloud, FaBook } from "react-icons/fa";
import linkClickHandler from "./linkHandler";
// import Logo from "./logo.png"

class WebMenu extends React.Component<any, any> {
  public state = {menuOpen: false}
  public render() {
    const menuEntries = [
      {
        icon: FaHome,
        name: "Home",
        path: "/index.html"
      },
      {
        icon: FaCogs,
        name: "Core",
        path: "/core.html"
      },
      {
        icon: FaWpforms,
        name: "Forms",
        path: "/form.html"
      },
      {
        icon: FaCloud,
        name: "UI",
        path: "/ui.html"
      },
      {
        icon: FaBook,
        name: "Documentation",
        path: "/docs/",
        external: true
      }
    ]
    const entries = menuEntries.map((entry) => {
      let classNames = "navbar-item"
      const currentPath = RouterStore.getCurrentRoute().path
      if (currentPath === entry.path || (entry.path === "/index.html" && currentPath === "/")) {
        classNames += " has-text-primary"
      } else {
        classNames += " has-text-link"
      }
      const Icon: any = entry.icon ? entry.icon : null
      return (
        <a
          className={classNames} key={entry.name}
          href={entry.path} target={entry.external ? "_blank" : ""}
          onClick={entry.external ? () => true : linkClickHandler}
        >
          {Icon ? <Icon className="textIcon" /> : <div />}
          {entry.name}
        </a>
      )
    })
    return (
      <nav className="navbar has-background-white-bis stickyNav" role="navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src={"Logo"} alt="xpfw" />
          </a>
          <div className="navbar-burger" onClick={() => {
            this.setState({menuOpen: !this.state.menuOpen})
          }}>
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className={`navbar-menu ${this.state.menuOpen ? "is-active" : ""}`}>
          {entries}
        </div>
      </nav>
    )
  }
}

export default WebMenu