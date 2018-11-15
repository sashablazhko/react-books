import React, { Component } from "react";

import "../../index.css";
import classes from "./Header.module.css";

export class Header extends Component {
  cls = [classes.Header, "grid-item"];
  render() {
    return <header className={this.cls.join(" ")}>Header</header>;
  }
}

export default Header;
