import React, { PureComponent } from "react";
import { Route, Redirect, Link } from "react-router-dom";
import fire from "../fire";


import "../assets/styles.css";


import { connect } from "react-redux";

class IndexPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="page-container">
         <h1><b>Caboose</b></h1>
        Up your freelance game: foster a healthy client relationship by making them feel included at every step of the project. Give them a ticket aboard your [New Co] project train and they will thank you.
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

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
