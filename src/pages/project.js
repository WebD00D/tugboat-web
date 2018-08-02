import React, { PureComponent } from "react";
import Link from "gatsby-link";
import fire from "../fire";
import { Route, Redirect } from "react-router-dom";
import cx from "classnames";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { CirclePicker } from "react-color";

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
  Mention
} from "antd";

const { Option, OptGroup } = Select;
const { TextArea } = Input;
const TabPane = Tabs.TabPane;
const { toString, toContentState } = Mention;

import LolipopAdmin from "../themes/lolipop-admin";
import Navigation from "../components/navigation/index";

const NoProjectsImage = styled.img`
  height: 200px;
  margin-bottom: 22px;
`;

const HelpText = styled.h4`
  margin-top: 12px;
`;

const ProjectCard = styled.div`
  height: 150px;
  width: 250px;
  max-height: 200px;
  max-width: 300px;
  padding: 12px;
  background-color: #ffffff;
  border-radius: 4px;
  margin-right: 30px;
  margin-bottom: 30px;
  transition: 0.2s ease;
  border: 1px solid #ddd;
  position: relative;

  h3 {
    margin-bottom: 0px;
    cursor: pointer;
  }

  label {
    color: #cccccc;
    font-size: 12px;
  }

  .project-card-actions {
    display: none;
    position: absolute;
    bottom: 12px;
    right: 12px;
  }

  &:hover {
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);

    .project-card-actions {
      display: block;
    }
  }
`;

const ProjectCardButton = styled(Button)`
  height: 20px;
  font-size: 12px;
`;

const ProjectCardButtonSmall = styled(Button)`
  height: 20px;
  font-size: 12px;
  width: 20px;
  padding: 0px;
  margin-left: 4px;
`;

const TicketCard = styled.div`
  min-height: 100px;
  transition: 0.2s ease;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin-bottom: 12px;
  padding: 12px;
  padding-top: 26px;
  cursor: pointer;
  position: relative;
  background-color: rgba(255, 255, 255, 0.3);
  border-left: 3px solid #72f2ad;

  &:hover {
    border: 1px solid #ddd;
    border-left: 3px solid #72f2ad;
    background-color: #fff;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  }
`;

const TicketCardMeta = styled.div`
  display: flex;
  align-items: center;
  color: #cccccc;
`;

const TicketTitle = styled.div`
  color: #252525;
  font-size: 22px;
  margin-left: 26px;
`;

const TicketNumber = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #ff8660;
  border-bottom-right-radius: 4px;
  height: 16px;
  font-size: 10px;
  letter-spacing: 1px;
  color: #ffffff;
`;

const AllTicketActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 22px;
`;

const AllTicketActionButtons = styled.div`
  display: flex;
  align-items: center;

  div {
    margin-left: 22px;
    color: #cccccc;
    cursor: pointer;
  }

  .active {
    color: #252525;
    border-bottom: 1px solid #252525;
  }
`;

class Project extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeProjectDetails: [],
      createNewTicket: false,
      newTicketTitle: "",
      newTicketDesc: "",
      notifyAllMembers: true,
      membersToNotify: "",
      newProjectETA: "",
      newProjectStatus: "Backlog",

      tickets_inProgress: 0,
      tickets_verifying: 0,
      tickets_done: 0,
      tickets_inQueue: 0,
      tickets_planning: 0,
      tickets_backlog: 0
    };
  }

  componentDidMount() {
    this.setState({
      activeProjectDetails: this.props.projects[this.props.activeProjectId]
    });

    fire
      .database()
      .ref(`/tickets-by-project/${this.props.activeProjectId}/`)
      .on(
        "value",
        function(snapshot) {
          console.log("TICKETS", snapshot.val());
          this.props.setTicketsByProject(snapshot.val());
        }.bind(this)
      );

      // pull next ticket number from project endpoint ..

      fire
      .database()
      .ref(`/projects/${this.props.user.id}/${this.props.activeProjectId}`)
      .on(
        "value",
        function(snapshot) {
          console.log("TICKET NUMBER", snapshot.val().TicketNumber);
          this.props.setNextTicketNumber(snapshot.val().TicketNumber);
        }.bind(this)
      );


  }

  createNewTicket() {
    console.log("CREATE NEW TICKET");

    const userId = this.props.user.id;
    const activeProjectId = this.props.activeProjectId;

    const newPostKey = fire
      .database()
      .ref(`tickets-by-project/`)
      .child(activeProjectId)
      .push().key;

    const ticketData = {
      id: newPostKey,
      ticketNumber: this.props.nextTicketNumber,
      title: this.state.newTicketTitle,
      description: this.state.newTicketDesc,
      membersToNotify: this.state.membersToNotify,
      notifyAllMembers: this.state.notifyAllMembers,
      eta: this.state.newProjectETA,
      status: this.state.newProjectStatus,
      by: this.props.user.name,
      lastUpdated: Date.now()
    };

    var updates = {};

    // update tickets-by-project
    updates[
      `/tickets-by-project/${activeProjectId}/${newPostKey}`
    ] = ticketData;

    // udpate the project lastUpdated , and project next Ticket #
    updates[
      `/projects/${this.props.user.id}/${this.props.activeProjectId}/TicketNumber`
    ] = this.props.nextTicketNumber + 1;
    updates[
      `/projects/${this.props.user.id}/${this.props.activeProjectId}/lastUpdated`
    ] = Date.now();

  // add ticket to users all ticket list
    updates[
      `/tickets-by-user/${this.props.user.id}/${newPostKey}`
    ] = ticketData;
  

   // .ref(`/projects/${this.props.user.id}/${this.props.activeProjectId}`)

  
    fire
      .database()
      .ref()
      .update(updates);

    message.success(`Ticket ${this.props.nextTicketNumber} created!`);

    this.setState({
      createNewTicket: false,
      newTicketTitle: "",
      newTicketDesc: "",
      notifyAllMembers: true,
      membersToNotify: "",
      newProjectETA: "",
      newProjectStatus: ""
    });
  }

  renderTickets(status) {
    if (this.props.ticketsByProject) {
      console.log(this.props.ticketsByProject);
      const allTickets = this.props.ticketsByProject;

      let Tickets = Object.keys(allTickets).map(key => {

        // id: newPostKey,
        // ticketNumber: this.props.nextTicketNumber,
        // title: this.state.newTicketTitle,
        // description: this.state.newTicketDesc,
        // membersToNotify: this.state.membersToNotify,
        // notifyAllMembers: this.state.notifyAllMembers,
        // eta: this.state.newProjectETA,
        // status: this.state.newProjectStatus,

        const lastUpdated = moment(allTickets[key].lastUpdated).format(
          "MM.DD.YY, h:mm a"
        );

        if (allTickets[key].status != status) {
          return;
        }

        return (
          <TicketCard key={key}>
            <TicketNumber style={{ backgroundColor: "#72F2AD" }}>
              #{allTickets[key].ticketNumber}
            </TicketNumber>
            <TicketCardMeta>
              <Icon
                type="exclamation-circle-o"
                style={{ color: "#72F2AD", marginRight: "12px" }}
              />{" "}
              Opened {lastUpdated} by {allTickets[key].by}
            </TicketCardMeta>
            <TicketTitle>{allTickets[key].title}</TicketTitle>
          </TicketCard>
        );
      });

      return <div style={{ marginTop: "20px" }}>{Tickets}</div>;
    } else {
      return (
        <div style={{ marginTop: "20px" }}>
          <UI.FlexColumn>
            <img
              style={{ height: "200px" }}
              src={require("../assets/icons/tickets.svg")}
            />
            <h2>
              <b>No tickets found.</b>
            </h2>

            <Button onClick={() => this.setState({ createNewTicket: true })}>
              Add a ticket
            </Button>
            <HelpText>
              Want help? <Link to="/help/tickets">Read this.</Link>
            </HelpText>
          </UI.FlexColumn>
        </div>
      );
    }
  }

  render() {
    let inProgressCount = 0;
    let verifyingCount = 0;
    let doneCount = 0;
    let inQueueCount = 0;
    let planningCount = 0;
    let backlogCount = 0;

    if (this.props.ticketsByProject) {
      let inProgress = _.filter(this.props.ticketsByProject, function(item) {
        return item.status === "In Progress";
      });
      inProgressCount = inProgress.length;

      let verifying = _.filter(this.props.ticketsByProject, function(item) {
        return item.status === "Verifying";
      });
      verifyingCount = verifying.length;

      let done = _.filter(this.props.ticketsByProject, function(item) {
        return item.status === "Done";
      });
      doneCount = done.length;

      let inQueue = _.filter(this.props.ticketsByProject, function(item) {
        return item.status === "In Queue";
      });
      inQueueCount = inQueue.length;

      let planning = _.filter(this.props.ticketsByProject, function(item) {
        return item.status === "Planning";
      });
      planningCount = planning.length;

      let backlog = _.filter(this.props.ticketsByProject, function(item) {
        return item.status === "Backlog";
      });
      backlogCount = backlog.length;
    }

    return (
      <LolipopAdmin>
        <Navigation
          hasProjectDetails={true}
          handleNewProject={() => this.setState({ createNewProject: true })}
        />
        <UI.PageContainerSmall>
          <UI.Box>
            <Link style={{ float: "right" }} to="/projects">
              <Icon type="arrow-left" /> Back to projects
            </Link>
            <h1>
              {this.state.activeProjectDetails
                ? this.state.activeProjectDetails.title
                : "No project set"}{" "}
            </h1>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "170px"
                }}
              >
                <div>2 Members</div>
                <Icon type="minus" />
                <div>
                  <Icon type="lock" /> Private
                </div>
              </div>
              <div>
                <Button
                  style={{ marginRight: "12px" }}
                  type="primary"
                  onClick={() => this.setState({ createNewTicket: true })}
                >
                  New Ticket
                </Button>
                <Button style={{ marginRight: "12px" }}>
                  <Icon type="share-alt" /> Share
                </Button>
                <Button style={{ marginRight: "12px" }}>
                  <Icon type="setting" /> Settings
                </Button>
                <Button type="danger">
                  <Icon type="delete" />
                </Button>
              </div>
            </div>

            <Tabs style={{ marginTop: "60px" }} defaultActiveKey="1">
              <TabPane tab={`In Progress (${inProgressCount})`} key="1">
                {this.renderTickets("In Progress")}
              </TabPane>
              <TabPane tab={`Verifying (${verifyingCount})`} key="2">
                {this.renderTickets("Verifying")}
              </TabPane>
              <TabPane tab={`Done (${doneCount})`} key="3">
                {this.renderTickets("Done")}
              </TabPane>
              <TabPane tab={`In Queue (${inQueueCount})`} key="4">
                {this.renderTickets("In Queue")}
              </TabPane>
              <TabPane tab={`Planning (${planningCount})`} key="5">
                {this.renderTickets("Planning")}
              </TabPane>
              <TabPane tab={`Backlog (${backlogCount})`} key="6">
                {this.renderTickets("Backlog")}
              </TabPane>
            </Tabs>
          </UI.Box>
        </UI.PageContainerSmall>

        <Modal
          title={`New Ticket #${this.props.nextTicketNumber}`}
          visible={this.state.createNewTicket}
          onOk={() => this.createNewTicket()}
          onCancel={() => this.setState({ createNewTicket: false })}
          okText="Create project"
        >
          <UI.FormField>
            <label>Ticket Title</label>
            <Input
              onChange={e => {
                this.setState({ newTicketTitle: e.target.value });
              }}
              placeholder="Ticket title"
            />
          </UI.FormField>

          <UI.FormField>
            <label>Description</label>
            <TextArea
              style={{ marginTop: "4px" }}
              onChange={e => {
                this.setState({ newTicketDesc: e.target.value });
              }}
              placeholder="Ticket description"
            />
          </UI.FormField>

          <UI.FormField>
            <div>
              <label>Time Estimate (days)</label>
            </div>
            <Select
              style={{ width: "150px", marginTop: "4px" }}
              defaultValue="1"
              onChange={val => {
                this.setState({ newProjectETA: val });
              }}
            >
              <Option value="1">1 day</Option>
              <Option value="2">2 days</Option>
              <Option value="3">3 days</Option>
              <Option value="4">4 days</Option>
              <Option value="5">5 days</Option>
              <Option value="6">6 days</Option>
              <Option value="7">7 days</Option>
              <Option value="8">8 days</Option>
              <Option value="9">9 days</Option>
              <Option value="10">10 days</Option>
              <Option value="11">11 days</Option>
              <Option value="12">12 days</Option>
              <Option value="13">13 days</Option>
              <Option value="14">14 days</Option>
            </Select>
          </UI.FormField>

          <UI.FormField>
            <div>
              <label>Status</label>
            </div>
            <Select
              style={{ width: "150px", marginTop: "4px" }}
              defaultValue="Backlog"
              onChange={val => {
                this.setState({ newProjectStatus: val });
              }}
            >
              <Option value="Backlog">Backlog</Option>
              <Option value="Planning">Planning</Option>
              <Option value="Queue">In Queue</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Verifying">Verifying</Option>
              <Option value="Done">Done</Option>
            </Select>
          </UI.FormField>

          <UI.FormField>
            <Checkbox
              style={{ marginRight: "12px" }}
              defaultChecked={true}
              onChange={e => {
                this.setState({
                  notifyAllMembers: e.target.checked
                });
              }}
            />
            <label>Notify all project members</label>
          </UI.FormField>

          <UI.FormField>
            <label>Members to Notify</label>

            <Select
              disabled={this.state.notifyAllMembers}
              mode="multiple"
              labelInValue
              placeholder="Select users"
              filterOption={false}
              onChange={val => this.setState({ membersToNotify: val })}
              style={{ width: "100%", marginTop: "4px" }}
            >
              <Option key={"rva.christian91@gmail.com"}>
                rva.christian91@gmail.com
              </Option>
              <Option key={"jcrm@comcast.net"}>jcrm@comcast.net</Option>
            </Select>
          </UI.FormField>
        </Modal>
      </LolipopAdmin>
    );
  }
}

const mapStateToProps = ({
  user,
  projects,
  newIssue,
  activeProject,
  hasProjectDetails,
  activeProjectId,
  tickets,
  ticketsByProject,
  nextTicketNumber
}) => {
  return {
    user,
    projects,
    newIssue,
    activeProject,
    hasProjectDetails,
    activeProjectId,
    tickets,
    ticketsByProject,
    nextTicketNumber
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTicketsByProject: tickets =>
      dispatch({
        type: `SET_TICKETS_BY_PROJECT`,
        tickets
      }),
      setNextTicketNumber: number => 
      dispatch({
        type: `SET_NEXT_TICKET_NUMBER`,
        number
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
