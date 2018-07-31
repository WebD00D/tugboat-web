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
  Steps
} from "antd";

const Step = Steps.Step;

class AdminOnBoardingSteps extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
        onboardingStep: 0,

    }
  }

  render() {

    return (
      <div>
        <h2>You made it! </h2>
            <Divider />
            <p>
              First, thank you for joining the COG courier service. Our aim is
              to help blah blah blah blah..
            </p>
            <p>
              Next, before you can start accepting orders, there are few things
              to knock off the list. We promise it won't hurt a bit, and we'll
              guide you right through it. Click the button below to begin your
              onboarding.
            </p>

            <div className="m-b-30 m-t-30">
              <Steps direction="vertical" current={this.state.onboardingStep}>
                <Step title="Setup delivery zones" description="Map out where you will deliver to and from" />
                <Step
                  title="Create first merchant"
                  description="Start populating the list of merchants you've partnered with"
                />
                <Step title="Add TwinJet API Key" description="Make sure you're properly connected with their dispatch service." />
              </Steps>
            </div>

            <Button
              onClick={() => this.setState({ onboarding: true })}
              type="primary"
            >
               Go to Step
              <Icon type="arrow-right" style={{color: "#fff"}} />
            </Button>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(
    AdminOnBoardingSteps
  );
  
