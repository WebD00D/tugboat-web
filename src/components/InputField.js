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

class InputField extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selected: false
    };
  }

  render() {

    let inputWrapperClass = cx({
      'w-100p': true,
      'field-group--left': this.props.isFieldGroup && this.props.pos === "left",
      'field-group--right': this.props.isFieldGroup && this.props.pos === "right",
    });

    return (
      <div className={inputWrapperClass} style={{width: this.props.wrapperWidth}}>
        <div className="input-wrap">
          <label>{this.props.labelName}</label>
          <input
            defaultValue={this.props.initialValue || ""}
            placeholder={this.props.placeholder || ""}
            onChange={e => this.props.setValue(e.target.value)}
            type={this.props.inputType}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(InputField);
