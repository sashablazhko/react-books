import React, { Component } from "react";
import classes from "./Layout.module.css";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export class Layout extends Component {
  render() {
    return (
      <div className={classes.Layout}>
        <Header />
        <main>{this.props.children}</main>
        <Footer />
      </div>
    );
  }
}

export default Layout;
