import React, { PureComponent } from "react";
import Link from "gatsby-link";
import fire from "../fire";
import { Route, Redirect } from "react-router-dom";
import cx from "classnames";
import _ from "lodash";
import { connect } from "react-redux";
import "whatwg-fetch";

import "../layouts/fcss.css";
import "../layouts/components.css";

class MenuItem extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showEdit: false
    };
  }

  render() {
    return (
      <div onClick={ ()=> this.props.editItem() }>
        <div className="menu-list__item">
          <div className="f-16 fc-purple">
            <div>{this.props.itemName}</div>
            <div className="f-12 o-3">{this.props.itemDescription}</div>
          </div>
          <div className="f-16 fc-purple">${this.props.itemPrice}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ userAuthenticated, merchantId }) => {
  return {
    userAuthenticated,
    merchantId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch({ type: `INCREMENT` })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);
