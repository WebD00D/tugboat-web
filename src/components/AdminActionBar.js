import React, { PureComponent } from "react";
import Link from "gatsby-link";
import cx from "classnames";

import "../layouts/fcss.css";
import "../layouts/components.css";
import "../layouts/admin.css";

import InputField from "../components/InputField";

import { connect } from "react-redux";

class AdminActionBar extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    let iconClass;

    switch (this.props.action) {
      case "Save":
        iconClass = "fa fa-check-circle";
        break;
      case "Add":
        iconClass = "fa fa-plus-circle";
        break;
      default:
        break;
    }

    let wrapperWidth = !this.props.hideButton ? "400px" : "";

    return (
      <div className="admin-title-bar">
        {this.props.backRoute ? (
          <Link to={this.props.backRoute} className="admin-back">
            <i className="fa fa-long-arrow-left" /> Back
          </Link>
        ) : (
          ""
        )}

        {this.props.searchBar ? (
          <InputField
            setValue={ (val) => console.log("SETTING VALUE") }
            placeholder={this.props.inputPlaceholder}
            wrapperWidth={wrapperWidth}
          />
        ) : (
          ""
        )}

        {this.props.route && !this.props.button ? (
          <Link
            className="button"
            to={this.props.route}
            style={{ backgroundColor: "#0c1267" }}
          >
            <i className={iconClass} /> {this.props.action} {this.props.model}
          </Link>
        ) : (
          ""
        )}

        {!this.props.route && !this.props.hideButton ? (
          <button onClick={ ()=> this.props.handleAction() } className="button" style={{ backgroundColor: "#0c1267" }}>
            <i className={iconClass} /> {this.props.action} {this.props.model}
          </button>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default AdminActionBar;
