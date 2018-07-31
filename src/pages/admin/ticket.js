import React, { PureComponent } from "react";
import Link from "gatsby-link";
import fire from "../../fire";
import { Route, Redirect } from "react-router-dom";
import cx from "classnames";
import _ from "lodash";
import { connect } from "react-redux";
import "whatwg-fetch";

import "../../layouts/fcss.css";
import "../../layouts/components.css";

import "antd/dist/antd.css";
import {
  Menu,
  Timeline,
  Dropdown,
  Button,
  Icon,
  message,
  Modal,
  Alert,
  Badge,
  Divider,
  Avatar,
  Select,
  Steps
} from "antd";

const Step = Steps.Step;

const Option = Select.Option;

import LolipopAdmin from "../../themes/lolipop-admin";
import AdminActionBar from "../../components/AdminActionBar";
import AdminPageTitle from "../../components/AdminPageTitle";
import AdminInfoPanel from "../../components/AdminInfoPanel";
import AdminOnBoardingSteps from "../../components/AdminOnBoardingSteps";
import MerchantListActions from "../../components/MerchantListActions";
import OrderListItems from "../../components/OrderListItems";

import InputField from "../../components/InputField";
import TextAreaField from "../../components/TextareaField";
import SelectField from "../../components/SelectField";
import HighlightedFormField from "../../components/HighlightedFormField";

import TicketPreview from "../../components/TicketPreview";

class Ticket extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      onboardingStep: 0
    };
  }

  render() {
    return (
      <div>
        <LolipopAdmin>
          <div className="component-box">
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                marginBottom: "12px",
                justifyContent: "space-between"
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <label>#3222</label>

                <label className="ticket-type ticket-type--relative  ">
                  <span className="ticket-type--enhancement"></span> Enhancement
                </label>

              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button>
                  <Icon type="paper-clip" />Add attachment
                </Button>
                <Select
                  defaultValue="Backlog"
                  style={{ width: "175px", marginLeft: "12px" }}
                >
                  <Option value="Backlog">Backlog</Option>
                  <Option value="Ready">Ready</Option>
                  <Option value="InProgress">In Progress</Option>
                  <Option value="ReadyForTesting">Testing</Option>
                  <Option value="Done">Done</Option>
                </Select>
              </div>
            </div>
            <h1 style={{ color: "#394165" }}>
              <b>Map doesn't load if user doesn't enable location</b>
            </h1>
            <p style={{fontSize: "18px"}}>
              Lorem ipsum dolor sit amet, euripidis mediocritatem quo ne, in eam
              malis utinam. Clita consul persecuti id sit, pri ne zril
              persequeris. Te sed aliquam epicuri, tale lucilius expetendis vel
              ea, eos ex justo minim civibus. Fabulas praesent in has.
            </p>


            <TextAreaField />
            <div style={{display: "flex", justifyContent: "flex-end"}}><Button type="primary">Save Note</Button></div>


          </div>

          {/* <Button
              style={{ marginBottom: "12px" }}
              type="primary"
              size="large"
            >
              Add Ticket
            </Button>
            <Button style={{ marginBottom: "40px" }} size="large">
              Create Project
            </Button> */}

          {/* <div className="ticket-list">
        
              <TicketPreview
                active={true}
                avatarColor={"#f56a00"}
                avatarBackground={"#fde3cf"}
                avatarInitial={"W"}
                clientLabel={"Workpath"}
                title={"Lorem ipsum dolar set amit consectetur forten alorra"}
                description={"Lorem ipsum dolar se amit conesectetur..."}
                ticketType={"bug"}
              />

               <TicketPreview
                active={false}
                avatarColor={"#f56a00"}
                avatarBackground={"#fde3cf"}
                avatarInitial={"W"}
                clientLabel={"Workpath"}
                title={"Lorem ipsum dolar set amit consectetur forten alorra?"}
                description={"Lorem ipsum dolar se amit conesectetur..."}
                ticketType={"question"}
              />

            
            </div> */}

          {/* <div className="details-section">
            <div
              className="top-bar "
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight: "30px",
                fontSize: "18px"
              }}
            >
              <Icon type="ellipsis" />
            </div>

              <div className="details-section-wrap details-section-wrap--none">
                  <h1><b>Aloha, Christian!</b></h1>
                  <h4>July 27, 2018</h4>
              </div>


          </div> */}
        </LolipopAdmin>
      </div>
    );
  }
}

const mapStateToProps = ({ user, courier, zones, merchants, twinJetAPI }) => {
  return { user, courier, zones, merchants, twinJetAPI };
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

export default connect(mapStateToProps, mapDispatchToProps)(Ticket);
