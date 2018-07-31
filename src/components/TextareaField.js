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

class TextareaField extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="w-100p">
        <div className="input-wrap">
          <div className="input-wrap">
            <label>{this.props.labelName}</label>
            <textarea
              defaultValue={this.props.initialValue || ""}
              onChange={e => this.props.setValue(e.target.value)}
            />
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(TextareaField);
