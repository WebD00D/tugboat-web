import React, { PureComponent } from "react";
import Link from "gatsby-link";
import cx from "classnames";

import "../layouts/fcss.css";
import "../layouts/components.css";
import "../layouts/admin.css";


import { connect } from "react-redux";

class HighlightedFormField extends PureComponent {
  constructor(props) {
    super(props);
  }


  render() {
    return (
        <div className="highlighted-form-fields" style={{marginTop: this.props.customTopMargin ? this.props.customTopMargin : ""}}>
        {this.props.children}
        <div className="highlighted-form-field__text">{this.props.highlightText}</div>
      </div>
    );
  }
}

export default HighlightedFormField;
