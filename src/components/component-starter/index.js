import React, { PureComponent } from "react";
import { Route, Redirect, Link } from "react-router-dom";
import fire from "../../fire";

import "./index.css";

import { connect } from "react-redux";

class ComponentStarter extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="page-container">
        
      </div>
    );
  }
}

const mapStateToProps = ({ merchantId, userAuthenticated }) => {
  return { merchantId, userAuthenticated };
};

const mapDispatchToProps = dispatch => {
  return {
    createAndSignInUser: (userId, first, last, email) =>
      dispatch({
        type: `CREATE_AND_SIGNIN_USER`,
        userId,
        first,
        last,
        email
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentStarter);
