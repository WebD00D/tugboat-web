import React, { PureComponent } from "react";
import Link from "gatsby-link";
import cx from "classnames";

import "../layouts/fcss.css";
import "../layouts/components.css";
import "../layouts/admin.css";


import InputField from "../components/InputField";

import { Progress } from 'antd';

import { connect } from "react-redux";

class OrderListItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {

    return (
        <div className="model-list__row">
        <div className="model-list__item model-list__item-sm">
            <label>ID</label>
            <div>{this.props.id}</div>
       </div>
        <div className="model-list__item">
            <label>Name</label>
            <div>{this.props.name}</div>
       </div>
       <div className="model-list__item ">
            <label>Phone</label>
            <div>{this.props.phone}</div>
       </div>
       <div className="model-list__item">
            <label>Merchant</label>
            <div>{this.props.merchant}</div>
       </div>
       <div className="model-list__item model-list__item-md">
            <label>Total</label>
            <div>{this.props.total}</div>
       </div>
       <div className="model-list__item model-list__item-md">
            <label>Status</label>
            { this.props.status ? <Progress percent={this.props.percent} showInfo={this.props.showInfo} status={this.props.status}  /> : <Progress showInfo={this.props.showInfo} percent={this.props.percent}  /> }
            
       </div>
    </div>
    );
  }
}

export default OrderListItem;
