import React, { PureComponent } from "react";
import Link from "gatsby-link";
import cx from "classnames";

import "../layouts/fcss.css";
import "../layouts/components.css";
import "../layouts/admin.css";


import InputField from "../components/InputField";

import { Progress } from 'antd';



import { connect } from "react-redux";

class MerchantListItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {



    return (
        <div className="model-list__row">
        <div className="model-list__item model-list__item-lg">
            <label>Merchant</label>
            <div>{this.props.merchant}</div>
       </div>
       <div className="model-list__item">
            <label>Phone</label>
            <div>{this.props.phone}</div>
       </div>
       <div className="model-list__item">
            <label>Sales</label>
            <div>{this.props.sales}</div>
       </div>
       <div className="model-list__item">
            <label>Status</label>
            { this.props.status ? <Progress percent={this.props.percent} status={this.props.status}  /> : <Progress percent={this.props.percent}  /> }
            
       </div>
    </div>
    );
  }
}

export default MerchantListItem;
