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
import TextareaField from "./TextareaField";
import SelectField from "./SelectField";

import Switch from "./Switch";

class MerchantSettings extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      merchantName: "",
      merchantPhone: "",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      streetAddress: "",
      city: "",
      state: "",
      zip: "",
      pickupOrDelivery: "Delivery Only",
      pickupFee: '',
      deliveryFee: '',
      merchantCategories: []
    };
  }

  render() {
    return (
      <div className="w-100p component">
        <div className="component-container">
          <h1 className="fc-purple">Merchant Settings</h1>
          <InputField
            setValue={value => this.setState({ merchantName: value })}
            labelName="Merchant Name"
            inputType="text"
          />
          <InputField
            setValue={value => this.setState({ merchantPhone: value })}
            labelName="Merchant Phone"
            inputType="text"
          />
          <InputField
            setValue={value => this.setState({ contactName: value })}
            labelName="Contact Name"
            inputType="text"
          />
          <InputField
            setValue={value => this.setState({ contactPhone: value })}
            labelName="Contact Phone"
            inputType="text"
          />
          <InputField
            setValue={value => this.setState({ contactEmail: value })}
            labelName="Contact Phone"
            inputType="email"
          />
          <InputField
            setValue={value => this.setState({ streetAddress: value })}
            labelName="Street Address"
            inputType="text"
          />
          <InputField
            setValue={value => this.setState({ city: value })}
            labelName="City"
            inputType="text"
          />
          <InputField
            setValue={value => this.setState({ state: value })}
            labelName="State"
            inputType="text"
          />
          <InputField
            setValue={value => this.setState({ zip: value })}
            labelName="Zip Code"
            inputType="number"
          />

          <SelectField
            setValue={value => this.setState({ pickupOrDelivery: value })}
            labelName="Pickup / Delivery Settings"
            selectOptions={[
              "Delivery & Pickup",
              "Delivery Only",
              "Pickup Only"
            ]}
          />

          <InputField
            setValue={value => this.setState({ pickupFee: value })}
            labelName="Pickup Fee"
            inputType="number"
          />

          <InputField
            setValue={value => this.setState({ deliveryFee: value })}
            labelName="Delivery Fee"
            inputType="number"
          />



          <div className="fx fx-a-c w-50p m-b-20">
            <Switch handleChange={ (value) => console.log(value) } defaultValue={true} />
            <label className="switch-label">
                Call Ins Only
            </label>
          </div>

          <button
            className="bg-red button-secondary"
          >
            Save Settings
          </button>




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

export default connect(mapStateToProps, mapDispatchToProps)(MerchantSettings);
