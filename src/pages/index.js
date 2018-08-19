import React, { PureComponent } from "react";
import Link from "gatsby-link";
import fire from "../fire";
import { Route, Redirect } from "react-router-dom";
import cx from "classnames";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { CirclePicker } from "react-color";

import firebase from "firebase";

import { getQueryVariable } from "../utils/app-utils";

import moment from "moment";

import "whatwg-fetch";

import "../assets/styles.css";

import * as UI from "../components/ui/index";

import "antd/dist/antd.css";
import {
  Button,
  message,
  Checkbox,
  Modal,
  Input,
  Select,
  Icon,
  Tooltip,
  Tabs,
  Tag,
  List,
  Mention,
  Divider,
  Alert
} from "antd";

const { Option, OptGroup } = Select;
const { TextArea } = Input;
const TabPane = Tabs.TabPane;
const { toString, toContentState } = Mention;

import LolipopAdmin from "../themes/lolipop-admin";
import Navigation from "../components/navigation/index";

class IndexPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false
    };
  }

  googleAuth() {
    let provider = new firebase.auth.GoogleAuthProvider();

    fire
      .auth()
      .signInWithPopup(provider)
      .then(
        function(result) {
          var token = result.credential.accessToken;
          var user = result.user;
          console.log("USER", user);

          var userObj = {
            authenticated: true,
            id: user.uid,
            type: `ADMIN`,
            email: user.email,
            photoURL: user.photoURL,
            name: user.displayName,
            githubToken: token
          };

          message.success(`Logged in as ${user.displayName}!`);

          this.props.auth(userObj);

          // ...
        }.bind(this)
      )
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log("ERROR", errorMessage);
        message.error("There was a problem logging you in!");
      });
  }

  authenticate() {
    let provider = new firebase.auth.GithubAuthProvider();
    provider.addScope("repo");

    fire
      .auth()
      .signInWithPopup(provider)
      .then(
        function(result) {
          var token = result.credential.accessToken;
          var user = result.user;
          console.log("USER", user);

          // check credits..
          var userObj = {
            authenticated: true,
            id: user.uid,
            type: `ADMIN`,
            email: user.email,
            photoURL: user.photoURL,
            name: user.displayName,
            githubToken: token,
          };

          message.success(`Logged in as ${user.displayName}!`);

          this.props.auth(userObj);

          // ...
        }.bind(this)
      )
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log("ERROR", errorMessage);
        message.error("There was a problem logging you in!");
      });
  }

  render() {
    if (this.props.user && this.props.user.authenticated) {
      return <Redirect to="/projects" />;
    }

    return (
      <div className="auth-wrap">
        <div className="auth">
          <div className="auth-banner">
            <h1
              style={{
                color: "#1890ff",
                marginBottom: "9px",
                display: "flex",
                alignItems: "center",
                fontSize: "40px"
              }}
            >
              <b>tugboat </b>
              <small style={{ fontSize: "12px" }}>beta</small>
            </h1>
            
          </div>

          <div style={{ padding: "20px", paddingTop: "0px" }}>
            <h2 style={{ textAlign: "center" }}> Sign in to get started</h2>
            <Button
              onClick={() => this.authenticate()}
              size="large"
              style={{ width: "100%", marginBottom: "12px" }}
              type="primary"
            >
              <Icon type="github" /> Github
            </Button>

            <Button
              onClick={() => this.googleAuth()}
              size="large"
              type="default"
              style={{ width: "100%" }}
            >
              <Icon type="google" /> Google
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

const mapDispatchToProps = dispatch => {
  return {
    auth: user =>
      dispatch({
        type: `AUTHENTICATE`,
        user
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
