import React, { PureComponent } from "react";
import { Route, Redirect, Link } from "react-router-dom";
import fire from "../../fire";



import firebase from "firebase";

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
  message,
  Alert,
  Tabs,
  Tag
} from "antd";

import { connect } from "react-redux";

class Navigation extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { mobileMenu: false, justSignedOut: false };
  }

  signout() {
    console.log("SIGN OUT");
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
        message.success("signed out successfully");
      })
      .catch(function(error) {
        // An error happened.
        message.error(error);
      });
    this.props.signoutUser();
    this.setState({ justSignedOut: true });
  }

  render() {
    const profileMenu = (
      <Menu>
        <div style={{ padding: "5px 12px" }}>
          <div>
            <b>{this.props.user.name}</b>
          </div>
          <div>{this.props.user.email}</div>
        </div>
        <Divider style={{ marginTop: "12px", marginBottom: "12px" }} />
        <Menu.Item>
          <div
            onClick={() => {
              this.signout();
            }}
          >
            Logout
          </div>
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

    if (this.state.justSignedOut) {
      return <Redirect to="/" />;
    }

    let noTixMessage = this.props.collab ? "Feeling generous? Get your beloved freelancer 100 more for $4.99" : "Click here to get more."

    return (
      <div>
        {this.props.ticketCredit === 0  ? (
          <Link to="/">
            <Alert
              message="No tickets left!"
              description={noTixMessage}
              type="error"
              showIcon
              banner
            />
            
          </Link>
        ) : (
          ""
        )}

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

          {this.props.collab ? (
            <div>
              <div style={{ textAlign: "right" }}>
                <small>Collaborating as:</small>
              </div>

              <Tag style={{ marginRight: "0px" }} color="#108ee9">
                {this.props.collaborator}
              </Tag>
            </div>
          ) : (
            <div className="nav-buttons">
              <Tag color={this.props.ticketCredit == 0 ? "red" : ""}>
                tickets: {this.props.ticketCredit}
              </Tag>

              <Dropdown overlay={profileMenu}>
                <span>
                  <Avatar shape="circle" src={this.props.user.photoURL} />
                </span>
              </Dropdown>
            </div>
          )}

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
              <div
                className="mobile-menu__item"
                onClick={() => {
                  this.signout();
                }}
              >
                Logout
              </div>

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
      </div>
    );
  }
}

const mapStateToProps = ({ user, projects, newIssue, ticketCredit }) => {
  return { user, projects, newIssue, ticketCredit };
};

const mapDispatchToProps = dispatch => {
  return {
    signoutUser: () =>
      dispatch({
        type: `SIGNOUT`
      })
      
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
