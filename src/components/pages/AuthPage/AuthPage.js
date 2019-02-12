import React, { Component } from "react";
import classes from "./AuthPage.module.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

import { signUp, signIn, me, refreshToken } from "../../../actions";
import Sign from "../../auth/Sign/Sign";
// import SignIn from "../../auth/SignIn/SignIn";
// import SignUp from "../../auth/SignUp/SignUp";
import { decodeToken, isExpired } from "../../../helpers";
import { authLoadingSelector, redirectToReferrerSelector, expirationDateSelector } from "../../../selectors";

import bg from "../../../resources/images/bg.jpg";
import Loader from "../../UI/Loader/Loader";

class AuthPage extends Component {
  constructor(props) {
    super(props);
    this.cookies = new Cookies();
  }

  componentDidMount() {
    const { expirationDate, me, refreshToken } = this.props;
    const accessToken = this.cookies.get("ACCESS_TOKEN");
    if (accessToken) {
      const tokenData = decodeToken(accessToken);
      if (!isExpired(tokenData.expirationDate) && !expirationDate) {
        me(accessToken);
      } else if (isExpired(tokenData.expirationDate) && !!expirationDate) {
        refreshToken(accessToken);
      }
    }
  }

  handleSignIn = ({ userEmail, userPass }) => this.props.signIn(userEmail, userPass);
  // handleSignIn = ({ userEmail, userPass }) => console.log("userEmail, userPass", userEmail, userPass);
  handleSignUp = ({ userEmail, userPass }) => this.props.signUp(userEmail, userPass);
  // handleSignUp = ({ userEmail, userPass, reCaptcha }) => console.log("userEmail, userPass, reCaptcha", userEmail, userPass, reCaptcha);

  renderBody = () => {
    const { signup, loading } = this.props;
    if (signup) {
      return <Sign signup onSubmit={this.handleSignUp} loading={loading} />;
    } else {
      return <Sign onSubmit={this.handleSignIn} loading={loading} />;
    }
  };

  render() {
    const { loading, location, redirectToReferrer, idUser, isAuthorized, expirationDate } = this.props;
    const { from } = location.state || { from: { pathname: "/" } };
    console.log("loadingAuth", loading);
    // if (expirationDate && !isAuthorized) {
    //   return <Loader />;
    // }
    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <div className={classes.AuthPage} style={{ background: `url(${bg})` }}>
        <div className="container container__small">
          <div className="centerblock background">{this.renderBody()}</div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    authLoading: authLoadingSelector(state),
    redirectToReferrer: redirectToReferrerSelector(state),
    expirationDate: expirationDateSelector(state),
    isAuthorized: expirationDateSelector(state) && parseInt(Date.now() / 1000, 10) < expirationDateSelector(state),
  }),
  { signUp, signIn, me, refreshToken },
  null,
  { pure: false }
)(AuthPage);
