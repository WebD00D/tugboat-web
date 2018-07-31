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

class MerchantOrderSettings extends PureComponent {
  constructor(props) {
    super(props);

    this._handleChange = this._handleChange.bind(this);

    this.state = {
      minOrderAmount: 0,
      maxOrderAmount: 0,
      minOrderPickup: 0,
      maxOrderPickuo: 0,
      taxPercentage: 0,
      deliveryFee: 0,
      dontApplyTaxToDelivery: true,
      tips: false,
      defaultTipAmount: 0,
      enableVouchers: false,
      enableFutureOrders: true
    };
  }

  _handleChange(value, field) {
    switch (field) {
      case "TaxToDelivery":
        this.setState({
          dontApplyTaxToDelivery: value
        });
        break;
      case "Tips":
        this.setState({
          tips: value
        });
        break;
      case "Vouchers":
        this.setState({
          enableVouchers: value
        });
        break;
      case "FutureOrders":
        this.setState({
          enableFutureOrders: value
        });
        break;

      default:
    }
  }

  render() {
    return (
      <div className="w-100p component">
        <div className="component-container">
          <h1 className="fc-purple">Merchant Order Settings</h1>

          <InputField
            setValue={value => this.setState({ minOrderAmount: value })}
            labelName="Min Order Amount"
            inputType="text"
          />

          <InputField
            setValue={value => this.setState({ maxOrderAmount: value })}
            labelName="Max Order Amount"
            inputType="text"
          />

          <InputField
            setValue={value => this.setState({ minOrderPickup: value })}
            labelName="Min Order Pickup"
            inputType="text"
          />

          <InputField
            setValue={value => this.setState({ maxOrderPickup: value })}
            labelName="Max Order Pickup"
            inputType="text"
          />


          <InputField
            setValue={value => this.setState({ taxPercentage: value })}
            labelName="Tax Percentage"
            inputType="number"
          />

          <div className="fx fx-col fx-j-c m-t-30 mx-600 m-b-20 m-t-20">
            <div className="fx fx-a-c ">
              <Switch
                handleChange={value =>
                  this._handleChange(value, "TaxToDelivery")
                }
                defaultValue={this.state.dontApplyTaxToDelivery}
              />
              <label className="switch-label">
                Don't Apply Tax To Delivery
              </label>
            </div>
          </div>

          <div className="fx fx-col fx-j-c m-t-30 mx-600 m-b-20 m-t-20">
            <div className="fx fx-a-c ">
              <Switch
                handleChange={value => this._handleChange(value, "Tips")}
                defaultValue={this.state.tips}
              />
              <label className="switch-label">Tips Enabled</label>
            </div>
          </div>

          <InputField
            setValue={value => this.setState({ defaultTipAmount: value })}
            labelName="Tip Default Amount"
            inputType="number"
          />

          <div className="fx fx-col fx-j-c m-t-30 mx-600 m-b-20 m-t-20">
            <div className="fx fx-a-c ">
              <Switch
                handleChange={value => this._handleChange(value, "Vouchers")}
                defaultValue={this.state.enableVouchers}
              />
              <label className="switch-label">Vouchers Enabled</label>
            </div>
          </div>

          <div className="fx fx-col fx-j-c m-t-30 mx-600 m-b-20 m-t-20">
            <div className="fx fx-a-c ">
              <Switch
                handleChange={value => this._handleChange(value, "FutureOrders")}
                defaultValue={this.state.enableFutureOrders}
              />
              <label className="switch-label">Future Orders Enabled</label>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(
  MerchantOrderSettings
);
