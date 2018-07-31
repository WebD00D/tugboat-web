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
import { Avatar, Icon } from "antd";

class TicketPreview extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    let ticketClass = this.props.active ? "ticket ticket--active" : "ticket";
    let ticketTypeClass = `ticket-type ticket-type--${this.props.ticketType}`;

    return (
      <div className={ticketClass}>
        <div className="ticket-actions">
          <Avatar
            style={{
              color: this.props.avatarColor,
              backgroundColor: this.props.avatarBackgrounf
            }}
          >
            {this.props.avatarInitial}
          </Avatar>
        </div>
        <div style={{ marginLeft: "18px" }}>
          <label>{this.props.clientLabel} on July 27th @10:30a</label>
          <h3>{this.props.title}</h3>
          <p>{this.props.description}</p>
        </div>
       
        <div className="ticket-type">
            <span className={`ticket-type--${this.props.ticketType}`}></span>
            {this.props.ticketType}
        </div>
      </div>
    );
  }
}

export default TicketPreview;
