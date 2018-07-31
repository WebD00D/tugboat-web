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

import "antd/dist/antd.css";
import { Spin } from "antd";



class Loading extends PureComponent {
  constructor(props) {
    super(props);

    
  }

  render() {

    return (
      <div style={{ height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Spin />
        <div>Just a sec, please..</div>
      </div>
    );
  }
}

export default Loading;
