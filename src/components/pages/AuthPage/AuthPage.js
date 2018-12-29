import React from "react";
import classes from "./AuthPage.module.css";
import { connect } from "react-redux";

import { signUp, signIn, moduleName } from "../../../ducks/auth";
import Sign from "../../auth/Sign/Sign";
// import SignIn from "../../auth/SignIn/SignIn";
// import SignUp from "../../auth/SignUp/SignUp";

import bg from "../../../resources/images/bg.jpg";

const AuthPage = props => {
  const handleSignIn = ({ userEmail, userPass }) => props.signIn(userEmail, userPass);
  // const handleSignIn = ({ userEmail, userPass }) => console.log("userEmail, userPass", userEmail, userPass);
  // const handleSignUp = ({ userEmail, userPass }) => props.signUp(email, password);
  const handleSignUp = ({ userEmail, userPass, reCaptcha }) =>
    console.log("userEmail, userPass, reCaptcha", userEmail, userPass, reCaptcha);

  const renderBody = () => {
    if (props.signup) {
      return <Sign signup onSubmit={handleSignUp} loading={props.loading} />;
    } else {
      return <Sign onSubmit={handleSignIn} loading={props.loading} />;
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
  state => ({ loading: state[moduleName].loading }),
  { signUp, signIn }
)(AuthPage);
