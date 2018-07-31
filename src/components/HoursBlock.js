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

import InputField from "./InputField";

class HoursBlock extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      success: false
    };
  }

  render() {
    return (
      <div>
        <div className="fx  fx-j-c m-t-30 mx-600 m-t-20">
          <div className="fx fx-a-c w-50p p-r-6">
            <InputField
              setValue={value => this.setState({ startOne: value })}
              labelName="From"
              inputType="time"
            />
          </div>
          <div className="fx fx-a-c w-50p p-l-6">
            <InputField
              setValue={value => this.setState({ closeOne: value })}
              labelName="To"
              inputType="time"
            />
          </div>
        </div>
        <div className="fx  fx-j-c m-t-30 mx-600 ">
          <div className="fx fx-a-c w-50p p-r-6">
            <InputField
              setValue={value => this.setState({ newItemName: value })}
              labelName="From"
              inputType="time"
            />
          </div>
          <div className="fx fx-a-c w-50p p-l-6">
            <InputField
              setValue={value => this.setState({ newItemName: value })}
              labelName="To"
              inputType="time"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default HoursBlock;
