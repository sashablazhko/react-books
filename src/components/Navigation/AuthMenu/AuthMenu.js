import React from "react";
import classes from "./AuthMenu.module.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signOut, moduleName } from "../../../ducks/auth";
import { isAuthorizedSelector } from "../../../selectors";

const AuthMenu = ({ isAuthorized, email, signOut }) => {
  return (
    <div className={classes.AuthMenu}>
      {!!isAuthorized && <i className="fas fa-user" />}
      {!isAuthorized && (
        <Link to="/auth/signin">
          <i className="fas fa-sign-in-alt" />
        </Link>
      )}
      {!!isAuthorized && (
        <div className={classes.submenu_wrapper}>
          <div className={classes.email}>
            <p>{email}</p>
          </div>
          <ul className={classes.submenu}>
            <li>Мой кабинет</li>
            <li onClick={signOut}>Выйти</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default connect(
  state => {
    return {
      isAuthorized: isAuthorizedSelector(state),
      email: state[moduleName].user.email,
    };
  },
  { signOut }
)(AuthMenu);
