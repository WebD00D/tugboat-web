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
import Switch from "./Switch";
import HoursBlock from "./HoursBlock";

class MerchantHours extends PureComponent {
  constructor(props) {
    super(props);

    this._handleSave = this._handleSave.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleHours = this._handleHours.bind(this);
    this.fieldErrors = this.fieldErrors.bind(this);

    this.state = {
      monday: false,
      tuesday: true,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,

      start_hours_mon_one: "",
      close_hours_mon_one: "",
      start_hours_mon_two: "",
      close_hours_mon_two: "",

      start_hours_tues_one: "",
      close_hours_tues_one: "",
      start_hours_tues_two: "",
      close_hours_tues_two: "",

      start_hours_wed_one: "",
      close_hours_wed_one: "",
      start_hours_wed_two: "",
      close_hours_wed_two: "",

      start_hours_thurs_one: "",
      close_hours_thurs_one: "",
      start_hours_thurs_two: "",
      close_hours_thurs_two: "",

      start_hours_fri_one: "",
      close_hours_fri_one: "",
      start_hours_fri_two: "",
      close_hours_fri_two: "",

      start_hours_sat_one: "",
      close_hours_sat_one: "",
      start_hours_sat_two: "",
      close_hours_sat_two: "",

      start_hours_sun_one: "",
      close_hours_sun_one: "",
      start_hours_sun_two: "",
      close_hours_sun_two: "",

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

  _handleSave() {}

  _handleChange(value, field) {
    switch (field) {
      case "Monday":
        this.setState({
          monday: value
        });
        break;
      case "Tuesday":
        this.setState({
          tuesday: value
        });
        break;
      case "Wednesday":
        this.setState({
          wednesday: value
        });
        break;
      case "Thursday":
        this.setState({
          thursday: value
        });
        break;
      case "Friday":
        this.setState({
          friday: value
        });
        break;
      case "Saturday":
        this.setState({
          saturday: value
        });
        break;
      case "Sunday":
        this.setState({
          sunday: value
        });
        break;
      default:
    }
  }

  _handleHours(value, field) {
    switch (field) {
      case "Monday":
        this.setState({
          monday: value
        });
        break;
      case "Tuesday":
        this.setState({
          tuesday: value
        });
        break;
      case "Wednesday":
        this.setState({
          wednesday: value
        });
        break;
      case "Thursday":
        this.setState({
          thursday: value
        });
        break;
      case "Friday":
        this.setState({
          friday: value
        });
        break;
      case "Saturday":
        this.setState({
          saturday: value
        });
        break;
      case "Sunday":
        this.setState({
          sunday: value
        });
        break;
      default:
    }
  }

  render() {
    return (
      <div className="w-100p component">
        <div className="component-container">
          <h1 className="fc-purple">Merchant Hours</h1>

          <div className="fx fx-col fx-j-c m-t-30 mx-600 m-b-20 m-t-20">
            <div className="fx fx-a-c w-50p">
              <Switch
                handleChange={value => this._handleChange(value, "Monday")}
                defaultValue={this.state.monday}
              />
              <label className="switch-label">Monday</label>
            </div>
          </div>

          {this.state.monday ? <HoursBlock /> : ""}

          <div className="fx fx-col fx-j-c m-t-30 mx-600 m-b-20 m-t-20">
            <div className="fx fx-a-c w-50p">
              <Switch
                handleChange={value => this._handleChange(value, "Tuesday")}
                defaultValue={this.state.tuesday}
              />
              <label className="switch-label">Tuesday</label>
            </div>
          </div>

          {this.state.tuesday ? <HoursBlock /> : ""}


          <div className="fx fx-col fx-j-c m-t-30 mx-600 m-b-20 m-t-20">
            <div className="fx fx-a-c w-50p">
              <Switch
                handleChange={value => this._handleChange(value, "Wednesday")}
                defaultValue={this.state.wednesday}
              />
              <label className="switch-label">Wednesday</label>
            </div>
          </div>

          {this.state.wednesday ? <HoursBlock /> : ""}


          <div className="fx fx-col fx-j-c m-t-30 mx-600 m-b-20 m-t-20">
            <div className="fx fx-a-c w-50p">
              <Switch
                handleChange={value => this._handleChange(value, "Thursday")}
                defaultValue={this.state.thursday}
              />
              <label className="switch-label">Thursday</label>
            </div>
          </div>

          {this.state.thursday ? <HoursBlock /> : ""}


          <div className="fx fx-col fx-j-c m-t-30 mx-600 m-b-20 m-t-20">
            <div className="fx fx-a-c w-50p">
              <Switch
                handleChange={value => this._handleChange(value, "Friday")}
                defaultValue={this.state.friday}
              />
              <label className="switch-label">Friday</label>
            </div>
          </div>

          {this.state.friday ? <HoursBlock /> : ""}


          <div className="fx fx-col fx-j-c m-t-30 mx-600 m-b-20 m-t-20">
            <div className="fx fx-a-c w-50p">
              <Switch
                handleChange={value => this._handleChange(value, "Saturday")}
                defaultValue={this.state.saturday}
              />
              <label className="switch-label">Saturday</label>
            </div>
          </div>

          {this.state.saturday ? <HoursBlock /> : ""}


          <div className="fx fx-col fx-j-c m-t-30 mx-600 m-b-20 m-t-20">
            <div className="fx fx-a-c w-50p">
              <Switch
                handleChange={value => this._handleChange(value, "Sunday")}
                defaultValue={this.state.sunday}
              />
              <label className="switch-label">Sunday</label>
            </div>
          </div>

          {this.state.sunday ? <HoursBlock /> : ""}


          <button
            onClick={() => this._handleSave()}
            className="bg-red button-secondary"
          >
            Save Hours
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

export default MerchantHours;
