import React, { PureComponent } from "react";
import Link from "gatsby-link";
import cx from "classnames";

import "../layouts/fcss.css";
import "../layouts/components.css";
import "../layouts/admin.css";

import InputField from "../components/InputField";

import OrderListItem from "../components/OrderListItem";

import { connect } from "react-redux";

import "antd/dist/antd.css";
import {
  Menu,
  Dropdown,
  Button,
  Timeline,
  Icon,
  message,
  Modal,
  Alert,
  Badge
} from "antd";

class OrderListItems extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div>
        <Modal
          title="Order #123"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div>
            <div>
              <Timeline>
                <Timeline.Item>Order placed 10:59pm</Timeline.Item>
                <Timeline.Item>
                  Successfully created Twin Jet Call 11:01pm
                </Timeline.Item>
                <Timeline.Item
                  dot={
                    <Icon type="clock-circle-o" style={{ fontSize: "16px" }} />
                  }
                  color="green"
                >
                  Merchant accepted order @11:10pm
                </Timeline.Item>
              </Timeline>

              <div>
                <div>
                  <b>Name</b>
                </div>
                <p>John Doe</p>

                <div>
                  <b>Date</b>
                </div>
                <p>07/20/2018 @11:30a</p>

                <div>
                  <b>Order Total</b>
                </div>
                <p>$12.67</p>

                <div>
                  <b>Rider Assigned</b>
                </div>
                <p>Jess Izen</p>

                <div>
                  <b>Merchant</b>
                </div>
                <p>Strange Matter</p>

                <div>
                  <b>Items</b>
                </div>
                <p>
                  <ul>
                    <li>Greek Salad (2)</li>
                    <li>French Fries (1)</li>
                    <li>Ranch Side (1)</li>
                  </ul>
                </p>
              </div>
            </div>
          </div>
        </Modal>

        <div className="model-list">
          <div onClick={this.showModal}>
            <OrderListItem
              merchant="Strange Matter"
              total="$12.50"
              phone="804.801.6177"
              name="John Doe"
              id="123"
              date="7/20/2018 11:30a"
              showInfo={false}
              percent={50}
            />
          </div>
          <OrderListItem
            merchant="Ellwood Thompson's"
            total="$6.75"
            phone="804.801.6177"
            name="John Doe"
            id="123"
            date="7/20/2018 11:30a"
            showInfo={true}
            percent={100}
          />
          <OrderListItem
            merchant="ZZQ"
            phone="804.801.6177"
            total="$19.33"
            name="John Doe"
            id="123"
            date="7/20/2018 11:30a"
            percent={100}
            showInfo={true}
            status={"exception"}
          />
          <OrderListItem
            merchant="The Daily"
            phone="804.801.6177"
            total="$12.50"
            id="123"
            name="John Doe"
            date="7/20/2018 11:30a"
            showInfo={true}
            percent={100}
          />
          <OrderListItem
            merchant="Strawberry Street"
            phone="804.801.6177"
            total="$12.50"
            id="123"
            name="John Doe"
            date="7/20/2018 11:30a"
            percent={100}
            showInfo={true}
          />
          <OrderListItem
            merchant="My Noodle"
            phone="804.801.6177"
            total="$12.50"
            name="John Doe"
            id="123"
            date="7/20/2018 11:30a"
            percent={100}
            showInfo={true}
          />
        </div>
      </div>
    );
  }
}

export default OrderListItems;
