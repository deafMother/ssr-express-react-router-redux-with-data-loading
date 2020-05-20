//  this hoc will check  the auth state i.e if the user is signed in or not

import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

export default (ChildComponent) => {
  class RequireAuth extends Component {
    render() {
      switch (this.props.auth) {
        case false:
          // in the server side once we redirect we need to handle it in the static router  to redirect
          return <Redirect to="/" />;
        case null:
          return <div>Loading...</div>;

        default:
          return <ChildComponent {...this.props} />;
      }
    }
  }

  function mapStateToProps({ auth }) {
    return { auth };
  }

  return connect(mapStateToProps)(RequireAuth);
};
