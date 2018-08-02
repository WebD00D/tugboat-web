import React, { PureComponent } from "react";
import Link from "gatsby-link";
import fire from "../fire";
import { Route, Redirect } from "react-router-dom";
import cx from "classnames";
import _ from "lodash";
import { connect } from "react-redux";
import "whatwg-fetch";

import "../assets/styles.css";


import { Avatar, Badge, Dropdown, Menu, Button, Icon } from "antd";

class AdminTheme extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    // May decide to do some theme file here, so created a theme wrapper just in case.. 
    return (
        <div className="theme-child-wrap">{this.props.children}</div>
    );
  }
}

const mapStateToProps = ({ user, courier }) => {
  return { user, courier };
};

//   const mapDispatchToProps = dispatch => {
//     return {
//       createCourier: (user, courier) =>
//         dispatch({
//           type: `LOGOUT_USER`
//         })
//     };
//   };

export default connect(mapStateToProps)(AdminTheme);
