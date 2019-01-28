import React, { Component } from "react";

class ErrorBoundry extends Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(err) {
    console.log("catch Error in getDerivedStateFromError", err);
    return { hasError: true };
  }

  componentDidCatch(err, info) {
    console.log("catch Error in componentDidCatch", err, info);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <div>Error!</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundry;
