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

import 'antd/dist/antd.css';
import { Menu, Dropdown, Button, Checkbox ,Icon } from 'antd';

class MerchantListActions extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {

    const sortMenu = (
        <Menu>
          <Menu.Item key="1"><Icon type="setting" />Status</Menu.Item>
          <Menu.Item key="2"><Icon type="line-chart" />Revenue</Menu.Item>
          <Menu.Item key="3"><Icon type="home" />Merchant Name</Menu.Item>
          <Menu.Item key="4"><Icon type="edit" />Last updated</Menu.Item>
          <Menu.Item key="5"><Icon type="star-o" />Created</Menu.Item>
        </Menu>
      );

      const statusMenu = (
        <Menu>
          <Menu.Item key="1">Pending</Menu.Item>
          <Menu.Item key="2">Active</Menu.Item>
          <Menu.Item key="3">Expired</Menu.Item>
          <Menu.Item key="4">Suspended</Menu.Item>
          <Menu.Item key="5">Blocked</Menu.Item>
        </Menu>
      );

      const ZoneMenu = (
        <Menu>
          <Menu.Item key="1"> <Checkbox></Checkbox> Zone 1 </Menu.Item>
          <Menu.Item key="2"> <Checkbox></Checkbox> Zone 2 </Menu.Item>
          <Menu.Item key="3"> <Checkbox></Checkbox> Zone 3 </Menu.Item>
        </Menu>
      );
      
    return (
        <div className="fx m-b-30">
        <div className="dropdown-wrapper m-r-20">
        <label>Status</label>
        <Dropdown overlay={statusMenu}>
            <Button style={{width: "150px"}} >
                Any Status <Icon type="down" />
            </Button>
        </Dropdown>
        </div>

        <div className="dropdown-wrapper m-r-20">
        <label>Zones</label>
        <Dropdown overlay={ZoneMenu}>
            <Button style={{width: "150px"}} >
                All Zones <Icon type="down" />
            </Button>
        </Dropdown>
        </div>

        <div className="dropdown-wrapper m-r-20 ">
        <label>Sort By</label>
        <Dropdown  overlay={sortMenu}>
            <Button style={{width: "150px"}}>
                Last Updated <Icon type="down" />
            </Button>
        </Dropdown>
        </div>

        <div className="dropdown-wrapper ">
          <label> PDF</label>
            <Button >
                <Icon type="download" />
            </Button>
        </div>
        
        </div>
      
    );
  }
}

export default MerchantListActions;
