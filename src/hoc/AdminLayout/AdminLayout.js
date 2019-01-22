import React, { Component } from "react";
import classes from "./AdminLayout.module.css";
import Sidebar from "../../components/admin/Sidebar/Sidebar";

export class AdminLayout extends Component {
  render() {
    return (
      <div className={classes.AdminLayout}>
        <Sidebar />
        <div style={{ flexGrow: 1, padding: "15px" }}>{this.props.children}</div>
      </div>
    );
  }
}

export default AdminLayout;
