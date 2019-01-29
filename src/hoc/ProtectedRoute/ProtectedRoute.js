import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { isAuthorizedSelector } from "../../selectors";

export class ProtectedRoute extends Component {
  render() {
    const { component, ...rest } = this.props;
    return <Route {...rest} render={this.renderProtected} />;
  }

  renderProtected = routeProps => {
    const { component: ProtectedComponent, isAuthorized, location } = this.props;
    return isAuthorized ? (
      <ProtectedComponent {...routeProps} />
    ) : (
      <Redirect to={{ pathname: "/auth/signin", state: { from: location } }} />
    );
  };
}

export default connect(
  state => ({
    // isAuthorized: isAuthorizedSelector(state),
    isAuthorized: state.auth.user.expirationDate && parseInt(Date.now() / 1000, 10) < state.auth.user.expirationDate,
  }),
  null,
  null,
  { pure: false }
)(ProtectedRoute);
