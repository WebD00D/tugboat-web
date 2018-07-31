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

class ValidationSample extends PureComponent {
  constructor(props) {
    super(props);

    this.doSomething = this.doSomething.bind(this);
    this.fieldErrors = this.fieldErrors.bind(this);

    this.state = {
      testValue: "",
      testValueTwo: "",

      error: false,
      success: false
    };
  }

  fieldErrors(fields) {

    let fieldsHaveErrors = false;

    fields.map(field => {
      if (field.value.trim() === "") {
        fieldsHaveErrors = true;
      }
    });

    return fieldsHaveErrors;
  }

  doSomething() {

    // an array of all the fields on the page.
    let fieldsToCheck = [
      { value: this.state.testValue },
      { value: this.state.testValueTwo }
    ];

    if (this.fieldErrors(fieldsToCheck)) {
      this.setState({
        error: true,
        success: false
      });
    } else {
      this.setState({
        error: false,
        success: true
      });

      // Fields are good. Safe to run our code to save to the database or whatever were need to do.
    }
  }

  render() {
    return (
      <div className="w-100p component">
        <div className="component-container">
          <h1 className="fc-purple">Validation Sample</h1>
          <InputField
            setValue={value => this.setState({ testValue: value })}
            labelName="Test Field"
            inputType="text"
          />
          <InputField
            setValue={value => this.setState({ testValueTwo: value })}
            labelName="Test Field Two"
            inputType="text"
          />
          <button
            onClick={() => this.doSomething()}
            className="bg-red button-secondary"
          >
            Click Me
          </button>

          {this.state.error ? (
            <div className="fc-red m-t-20">This form has errors :(</div>
          ) : (
            ""
          )}

          {!this.state.error && this.state.success ? (
            <div className="fc-green m-t-20">This form looks good!</div>
          ) : (
            ""
          )}


        </div>
      </div>
    );
  }
}

export default ValidationSample;
