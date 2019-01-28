import React from "react";
import classes from "./AuthPage.module.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { signUp, signIn } from "../../../actions";
import Sign from "../../auth/Sign/Sign";
// import SignIn from "../../auth/SignIn/SignIn";
// import SignUp from "../../auth/SignUp/SignUp";

import bg from "../../../resources/images/bg.jpg";

const AuthPage = ({ signup, loading, location, redirectToReferrer, signIn, signUp }) => {
  const { from } = location.state || { from: { pathname: "/" } };
  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }

  const handleSignIn = ({ userEmail, userPass }) => signIn(userEmail, userPass);
  // const handleSignIn = ({ userEmail, userPass }) => console.log("userEmail, userPass", userEmail, userPass);
  // const handleSignUp = ({ userEmail, userPass }) => signUp(email, password);
  const handleSignUp = ({ userEmail, userPass, reCaptcha }) =>
    console.log("userEmail, userPass, reCaptcha", userEmail, userPass, reCaptcha);

  const renderBody = () => {
    if (signup) {
      return <Sign signup onSubmit={handleSignUp} loading={loading} />;
    } else {
      return <Sign onSubmit={handleSignIn} loading={loading} />;
    }
  };

  return (
    <div className={classes.AuthPage} style={{ background: `url(${bg})` }}>
      <div className="container container__small">
        <div className="centerblock background">{renderBody()}</div>
      </div>
    </div>
  );
};

export default connect(
  state => ({
    loading: state.auth.loading,
    redirectToReferrer: state.auth.redirectToReferrer,
  }),
  { signUp, signIn }
)(AuthPage);
