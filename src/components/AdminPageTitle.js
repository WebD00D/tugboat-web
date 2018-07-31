import React, { PureComponent } from "react";
import Link from "gatsby-link";
import cx from "classnames";

import "../layouts/fcss.css";
import "../layouts/components.css";
import "../layouts/admin.css";


import { connect } from "react-redux";

class AdminPageTitle extends PureComponent {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="admin-page-title">
            <h1 className="fc-purple">{this.props.title}</h1>
      </div>
    );
  }
}

export default AdminPageTitle;
