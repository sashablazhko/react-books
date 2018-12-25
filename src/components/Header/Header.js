import React, { Component } from "react";
import { Link } from "react-router-dom";

import classes from "./Header.module.css";
import AuthMenu from "../Navigation/AuthMenu/AuthMenu";
import Icon from "../../icon";

export class Header extends Component {
  cls = [classes.Header, "grid-item"];
  render() {
    return (
      <header className={this.cls.join(" ")}>
        <div className={classes.logo}>
          <Link to="/">
            <Icon name="logo" width={50} />
            Book4U
          </Link>
        </div>

        <div className={classes.options}>
          <AuthMenu />
        </div>
      </header>
    );
  }
}

export default Header;
