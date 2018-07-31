import React, { PureComponent } from "react";
import Link from "gatsby-link";
import cx from "classnames";

import "../layouts/fcss.css";
import "../layouts/components.css";
import "../layouts/admin.css";

import InputField from "../components/InputField";

import DeliveryZoneItem from "../components/DeliveryZoneItem";

import { connect } from "react-redux";

class DeliveryZoneItems extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {

    const zones = this.props.zones && Object.keys(this.props.zones).map(key => {
      
      return (
        <DeliveryZoneItem zone={this.props.zones[key].name} color={this.props.zones[key].color} />
      )
    })

    return (
      <div className="model-list">
      {zones}
      </div>
    );
  }
}

export default DeliveryZoneItems;
