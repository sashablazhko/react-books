import React from "react";
import classes from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/admin/books", label: "Книги", exact: false },
  { to: "/admin/chapters", label: "Главы", exact: false },
  { to: "/admin/authors", label: "Авторы", exact: false },
];

const Sidebar = () => {
  return (
    <ul className={classes.Sidebar}>
      {links.map((link, index) => {
        return (
          <li key={index}>
            <NavLink to={link.to} exact={link.exact} activeClassName={classes.active}>
              {link.label}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default Sidebar;
