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
  Steps
} from "antd";

const Step = Steps.Step;

import LolipopAdmin from "../themes/lolipop-admin";


import TicketPreview from "../components/TicketPreview";


class Dashboard extends PureComponent {
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


            <h1 style={{color: "#394165"}}><b> Tickets</b></h1>

             <TicketPreview
                active={true}
                avatarColor={"#f56a00"}
                avatarBackground={"#fde3cf"}
                avatarInitial={"W"}
                clientLabel={"Workpath"}
                title={"Lorem ipsum dolar set amit consectetur forten alorra"}
                description={"Lorem ipsum dolar se amit conesectetur..."}
                ticketType={"question"}
              />

               <TicketPreview
                active={true}
                avatarColor={"#f56a00"}
                avatarBackground={"#fde3cf"}
                avatarInitial={"W"}
                clientLabel={"Workpath"}
                title={"Lorem ipsum dolar set amit consectetur forten alorra"}
                description={"Lorem ipsum dolar se amit conesectetur..."}
                ticketType={"enhancement"}
              />

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
                active={true}
                avatarColor={"#f56a00"}
                avatarBackground={"#fde3cf"}
                avatarInitial={"W"}
                clientLabel={"Workpath"}
                title={"Lorem ipsum dolar set amit consectetur forten alorra"}
                description={"Lorem ipsum dolar se amit conesectetur..."}
                ticketType={"enhancement"}
              />
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
                active={true}
                avatarColor={"#f56a00"}
                avatarBackground={"#fde3cf"}
                avatarInitial={"W"}
                clientLabel={"Workpath"}
                title={"Lorem ipsum dolar set amit consectetur forten alorra"}
                description={"Lorem ipsum dolar se amit conesectetur..."}
                ticketType={"bug"}
              />


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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
