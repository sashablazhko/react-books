import React, { Component } from "react";

import "../../index.css";
import classes from "./Header.module.css";

export class Header extends Component {
  cls = [classes.Header, "grid-item"];
  render() {
    return (
      <header className={this.cls.join(" ")}>
        <div className="logo">book4u</div>
        <div className="options">
          <div className="login">login</div>
          <div className="menu">menu</div>
        </div>
      </header>
    );
  }
}

export default Header;
