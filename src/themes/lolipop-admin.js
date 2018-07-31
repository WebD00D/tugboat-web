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
import "../layouts/admin.css";

import "../layouts/lolipop.css";

import TicketPreview from "../components/TicketPreview";

import { Avatar, Badge, Dropdown, Menu, Button, Icon } from "antd";

class AdminTheme extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {

   // console.log(location.pathname)
    return (
      <div>
        <div className="lolipop-nav">
          <div>1</div>
          <div>2</div>
        </div>
        <div className="theme-child-wrap">{this.props.children}</div>
      </div>
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
