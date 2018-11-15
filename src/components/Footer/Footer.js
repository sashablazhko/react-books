import React from "react";

import classes from "./Footer.module.css";

function Footer() {
  const cls = [classes.Footer, "grid-item"];
  return <div className={cls.join(" ")}>Footer</div>;
}

export default Footer;
