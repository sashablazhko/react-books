import React, { Component } from "react";
import classes from "./Layout.module.css";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import Cookies from "universal-cookie";

import "react-toastify/dist/ReactToastify.min.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";
import { me, refreshToken } from "../../actions";
import { decodeToken, isExpired } from "../../helpers";
import Loader from "../../components/UI/Loader/Loader";

export class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
    };
    this.cookies = new Cookies();
  }

  componentDidMount() {
    const { expirationDate, me, refreshToken } = this.props;
    const accessToken = this.cookies.get("ACCESS_TOKEN");
    if (accessToken) {
      const tokenData = decodeToken(accessToken);
      if (!isExpired(tokenData.expirationDate) && !expirationDate) {
        me(accessToken);
      } else if (isExpired(tokenData.expirationDate) && !expirationDate) {
        refreshToken(accessToken);
      }
    }
  }

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
    const { loading } = this.props;
    return (
      <div className={classes.Layout}>
        <Drawer isOpen={this.state.menu} onClose={this.menuCloseHandler} />
        <MenuToggle onToggle={this.toggleMenuHandler} isOpen={this.state.menu} />
        <Header />
        <main>{loading ? <Loader /> : this.props.children}</main>
        <Footer />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default connect(
  state => ({
    expirationDate: state.auth.user.expirationDate,
    loading: state.auth.loading,
  }),
  { me, refreshToken }
)(Layout);
