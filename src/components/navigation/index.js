import React, { PureComponent } from "react";
import { Route, Redirect, Link } from "react-router-dom";
import fire from "../../fire";

import "./index.css";

import "antd/dist/antd.css";
import {
  Button,
  Icon,
  Avatar,
  Badge,
  Menu,
  Dropdown,
  Divider,
  Breadcrumb,
  Tabs,
  Tag,
} from "antd";

import { connect } from "react-redux";

class Navigation extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { mobileMenu: false };
  }

  render() {
    const profileMenu = (
      <Menu>
        <Menu.Item>
          <Button style={{ width: "100%" }} type="primary">
            Upgrade to Pro
          </Button>
        </Menu.Item>
        <div style={{ padding: "5px 12px" }}>
          <div>
            <b>Christian Bryant</b>
          </div>
          <div>rva.christian91@gmail.com</div>
        </div>
        <Divider style={{ marginTop: "12px", marginBottom: "12px" }} />
        <Menu.Item>
          <div>Settings</div>
        </Menu.Item>
        <Menu.Item>
          <div>Help</div>
        </Menu.Item>
        <Menu.Item>
          <div>Contact Support</div>
        </Menu.Item>
        <Menu.Item>
          <div>Terms of Service</div>
        </Menu.Item>
        <Menu.Item>
          <div>Logout</div>
        </Menu.Item>
      </Menu>
    );

    const notificationMenu = (
      <Menu>
        <Menu.Item>
          <div>This is a notification</div>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className="nav">
        <h1
          style={{
            color: "#1890ff",
            marginBottom: "0px",
            display: "flex",
            alignItems: "center"
          }}
        >
          <img
            style={{ height: "40px", marginRight: "8px" }}
            src={require("../../assets/icons/steering-wheel.svg")}
          />{" "}
          <b>tugboat</b>
        </h1>

        { this.props.collab ?
          <div>
            <div style={{textAlign: "right"}}><small>Collaborating as:</small></div>

           <Tag style={{marginRight: "0px"}} color="#108ee9">{this.props.collaborator}</Tag></div>

          
          :  <div className="nav-buttons">
          
          <Dropdown overlay={notificationMenu}>
            <span style={{ marginRight: "12px" }}>
              <Badge count={1}>
                <Avatar shape="circle" icon="notification" />
              </Badge>
            </span>
          </Dropdown>
          <Dropdown overlay={profileMenu}>
            <span>
              <Avatar shape="circle">CB</Avatar>
            </span>
          </Dropdown>
        </div> }
       
        

        <Icon
          onClick={() => {
            this.setState({
              mobileMenu: !this.state.mobileMenu
            });
          }}
          className="mobile-menu-icon"
          style={{ fontSize: "30px" }}
          type="ellipsis"
        />
        {this.state.mobileMenu ? (
          <div className="mobile-menu">
            <Link to="/" className="mobile-menu__item">
              Projects
            </Link>
            <Link to="/" className="mobile-menu__item">
              Notifications
            </Link>
            <Link to="/" className="mobile-menu__item">
              Account Settings
            </Link>
            <Link to="/" className="mobile-menu__item">
              Help Desk
            </Link>
            <Link to="/" className="mobile-menu__item">
              Upgrade to Pro
            </Link>
            <div
              onClick={() => this.setState({ mobileMenu: false })}
              className="mobile-menu__item"
            >
              Close
            </div>
            <div to="/" className="mobile-menu__item">
              <h1
                style={{
                  color: "#1890ff",
                  marginBottom: "0px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <img
                  style={{ height: "40px", marginRight: "8px" }}
                  src={require("../../assets/icons/steering-wheel.svg")}
                />{" "}
                <b>tugboat</b>
              </h1>
            </div>

          </div>
        ) : (
          ""
        )}


      </div>
    );
  }
}

const mapStateToProps = ({ user, projects, newIssue }) => {
  return { user, projects, newIssue };
};

const mapDispatchToProps = dispatch => {
  return {
    createCourier: (user, courier) =>
      dispatch({
        type: `CREATE_COURIER`,
        user,
        courier
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
