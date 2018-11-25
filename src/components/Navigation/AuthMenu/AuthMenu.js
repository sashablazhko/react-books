import React from "react";
import classes from "./AuthMenu.module.css";

const AuthMenu = () => {
  return (
    <div className={classes.AuthMenu}>
      <i className="fas fa-user" />
      {/* <i className="fas fa-sign-in-alt" /> */}
      <div className={classes.submenu_wrapper}>
        <div className={classes.submenu}>
          <p>sashablazhko@gmail.com</p>
          <p>Мой кабинет</p>
          <p>Выйти</p>
        </div>
      </div>
    </div>
  );
};

export default AuthMenu;
