import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Navigation/Navigation.module.css";

export default class MovieInfo extends Component {
  render() {
    const { id } = this.props;
    return (
      <div>
        <p>Additional information</p>
        <NavLink
          exact
          to={{
            pathname: `/movie/${id}/cast`,
            state: { from: this.props.newLocation },
          }}
          className={styles.NavigationLink + " " + styles.AddInfoLink}
          activeClassName={styles.NavigationLinkActive}
        >
          Cast
        </NavLink>
        <br />
        <NavLink
          to={{
            pathname: `/movie/${id}/reviews`,
            state: { from: this.props.newLocation },
          }}
          className={styles.NavigationLink + " " + styles.AddInfoLink}
          activeClassName={styles.NavigationLinkActive}
        >
          Reviews
        </NavLink>
      </div>
    );
  }
}

MovieInfo.propTypes = {
  id: PropTypes.number.isRequired,
};
