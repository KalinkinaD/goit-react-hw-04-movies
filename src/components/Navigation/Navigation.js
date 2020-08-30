import React from "react";
import { NavLink } from "react-router-dom";
import routes from "../../routes";
import styles from "./Navigation.module.css";
const Navigation = () => {
  return (
    <div className={styles.Navigation}>
      <NavLink
        exact
        to={routes.home}
        className={styles.NavigationLink + " " + styles.navLink}
        activeClassName={styles.NavigationLinkActive}
      >
        Home
      </NavLink>
      <br />
      <NavLink
        to={routes.movies}
        className={styles.NavigationLink + " " + styles.navLink}
        activeClassName={styles.NavigationLinkActive}
      >
        Movies
      </NavLink>
    </div>
  );
};

export default Navigation;
