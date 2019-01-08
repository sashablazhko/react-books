import React, { Component } from "react";
import classes from "./Layout.module.css";
import { Provider } from "react-redux";
import store from "../../redux";
import { ConnectedRouter } from "connected-react-router";
import history from "../../history";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";

export class Layout extends Component {
  state = {
    menu: false,
  };

  toggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu,
    });
  };

  menuCloseHandler = () => {
    this.setState({
      menu: false,
    });
  };

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className={classes.Layout}>
            <Drawer isOpen={this.state.menu} onClose={this.menuCloseHandler} />
            <MenuToggle onToggle={this.toggleMenuHandler} isOpen={this.state.menu} />
            <Header />
            <main>{this.props.children}</main>
            <Footer />
            <ToastContainer autoClose={3000} />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default Layout;
