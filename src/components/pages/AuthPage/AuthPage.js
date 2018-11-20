import React from "react";
import SignIn from "../../auth/SignIn/SignIn";
import SignUp from "../../auth/SignUp/SignUp";

const AuthPage = props => {
  const handleSignIn = val => console.log(val);
  const handleSignUp = val => console.log(val);

  const renderBody = () => {
    if (props.singup) {
      return <SignUp onSubmit={handleSignUp} />;
    } else {
      return <SignIn onSubmit={handleSignIn} />;
    }
  };

  return <div>{renderBody()}</div>;
};

export default AuthPage;
