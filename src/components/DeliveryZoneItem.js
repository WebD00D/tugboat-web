import React, { PureComponent } from "react";
import Link from "gatsby-link";
import cx from "classnames";

import "../layouts/fcss.css";
import "../layouts/components.css";
import "../layouts/admin.css";

import MapZone from "../components/MapZone";


import InputField from "../components/InputField";

import { Button } from "antd";

import { connect } from "react-redux";

class DeliveryZoneItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="model-list__row">
        <div className="model-list__item model-list__item-lg">
          <label>Name</label>
          <div style={{ color: this.props.color }}>{this.props.zone}</div>
        </div>
        <Button>Edit Zone</Button>
        
      </div>
    );
  }
}

export default DeliveryZoneItem;
