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

import "antd/dist/antd.css";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  message,
  Steps
} from "antd";

const FormItem = Form.Item;

class FormInputField extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      validatedStatus: "",
      helpText: "",
      textValue: ""
    };
  }

  componentDidMount() {
   
    if (this.props.defaultValue.trim() != "") {
      this.setState({
        validatedStatus: "success"
      });
    } else {
      this.setState({
        validatedStatus: this.props.status
      });
    }
  }

  handleChange(value) {
    this.setState({
      validatedStatus: "validating"
    });
    setTimeout(
      function() {
        this.setState({
          textValue: value,
          validatedStatus: value.trim() != "" ? "success" : "error"
        });
        this.props.handleChange(value);
      }.bind(this),
      1000
    );
  }

  render() {
    return (
      <FormItem
        hasFeedback
        validateStatus={this.state.validatedStatus}
        help={this.props.helpText}
        label={this.props.label}
      >
        <Input
          type={ this.props.inputType ? this.props.inputType : "text" }
          onChange={e => this.handleChange(e.target.value)}
          defaultValue={this.props.defaultValue}
        />
      </FormItem>
    );
  }
}

export default FormInputField;
