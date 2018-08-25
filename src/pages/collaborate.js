import React, { PureComponent } from "react";
import Link from "gatsby-link";
import fire from "../fire";
import { Route, Redirect } from "react-router-dom";
import cx from "classnames";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { CirclePicker } from "react-color";

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
  background-color: rgba(255, 255, 255, 0.8);
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

class Collaborate extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      collaborator: "NOT SET",
      emailToCheck: "",

      activeProjectDetails: [],
      createNewTicket: false,
      newTicketTitle: "",
      newTicketDesc: "",
      newProjectETA: "1",
      newProjectStatus: "Queue",

      edit_id: "",
      edit_ticketNumber: "",
      edit_title: "",
      edit_description: "",
      edit_membersToNotify: "",
      edit_notifyAllMembers: "",
      edit_eta: "",
      edit_status: "",
      show_edit_modal: false,

      tickets_inProgress: 0,
      tickets_verifying: 0,
      tickets_done: 0,
      tickets_inQueue: 0,
      tickets_planning: 0,
      tickets_backlog: 0,

      ticket_credit_left: 0,

      noProjectFound: false
    };
  }

  componentDidMount() {
    const u = getQueryVariable("u");
    const p = getQueryVariable("p");

    this.setState({
      creatorId: u,
      projectId: p
    });

    fire
      .database()
      .ref(`/tickets-by-project/${p}/`)
      .on(
        "value",
        function(snapshot) {
          this.props.setTicketsByProject(snapshot.val());
        }.bind(this)
      );


    fire
    .database()
    .ref(`/credits/${u}/`)
    .on(
      "value",
      function(snapshot) {
        this.props.setTicketCredit(snapshot.val().tickets) 
      }.bind(this)
    );

    fire
      .database()
      .ref(`/projects/${u}/${p}`)
      .on(
        "value",
        function(snapshot) {

          if ( !snapshot.val() ) {
            console.log("project is null!!!")

            this.setState({ noProjectFound: true })
          } else {
            this.props.setActiveProject(p);
            this.props.setCollaboratorProject(snapshot.val());
            this.props.setNextTicketNumber(snapshot.val().TicketNumber);
          }
          
        }.bind(this)
      );
  }

  authenticateEmail() {
    if (this.props.projects.collaborators) {
      const collabs = this.props.projects.collaborators;
      const emailToCheck = this.state.emailToCheck;

      let authenticated = Object.keys(collabs).map(key => {
        return _.includes(collabs[key], emailToCheck);
      });

      if (_.includes(authenticated, true)) {
        message.success(`${emailToCheck} is authorized!`);
        this.setState({
          collaborator: emailToCheck
        });
      } else {
        message.error(`${emailToCheck} is not authorized.`);
      }
    } else {
      message.error(`Email is not authorized.`);
    }
  }

  createNewTicket() {
    const userId = this.state.creatorId;
    const activeProjectId = this.state.projectId;

    let updates = {};

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
      eta: "",
      status: "Queue",
      by: this.state.collaborator,
      lastUpdated: Date.now()
    };

    // update tickets-by-project
    updates[
      `/tickets-by-project/${activeProjectId}/${newPostKey}`
    ] = ticketData;

    // udpate the project lastUpdated , and project next Ticket #
    updates[`/projects/${userId}/${activeProjectId}/TicketNumber`] =
      this.props.nextTicketNumber + 1;

    updates[`/projects/${userId}/${activeProjectId}/lastUpdated`] = Date.now();

    updates[
      `/credits/${userId}/tickets/`] = (Number(this.props.ticketCredit) - 1);


    fire
      .database()
      .ref()
      .update(updates);

    message.success(`Ticket ${this.props.nextTicketNumber} created!`);

    this.setState({
      createNewTicket: false,
      newTicketTitle: "",
      newTicketDesc: "",
      newProjectETA: "",
      newProjectStatus: "Queue"
    });
  }

  showTicketDetails(ticket) {
    this.setState({
      edit_id: ticket.id,
      edit_ticketNumber: ticket.ticketNumber,
      edit_title: ticket.title,
      edit_description: ticket.description,
      edit_eta: ticket.eta,
      edit_status: ticket.status,
      show_edit_modal: true
    });
  }

  editTicket() {
    const activeProjectId = this.props.activeProjectId;

    const ticketData = {
      id: this.state.edit_id,
      ticketNumber: this.state.edit_ticketNumber,
      title: this.state.edit_title,
      description: this.state.edit_description,
      eta: this.state.edit_eta,
      status: this.state.edit_status,
      by: this.state.collaborator,
      lastUpdated: Date.now()
    };

    var updates = {};

    // update tickets-by-project
    updates[
      `/tickets-by-project/${activeProjectId}/${this.state.edit_id}`
    ] = ticketData;

    updates[
      `/projects/${this.state.creatorId}/${activeProjectId}/lastUpdated`
    ] = Date.now();

  

    fire
      .database()
      .ref()
      .update(updates);

    message.success(`Ticket #${this.state.edit_ticketNumber} saved!`);

    this.setState({
      edit_id: "",
      edit_ticketNumber: "",
      edit_title: "",
      edit_description: "",

      show_edit_modal: false
    });
  }

  renderAllTickets() {
    if (this.props.ticketsByProject) {
      const allTickets = this.props.ticketsByProject;
      let Tickets = Object.keys(allTickets).map(key => {
        const lastUpdated = moment(allTickets[key].lastUpdated).format(
          "MM.DD.YY, h:mm a"
        );

        let ticketNumberBG = "#72F2AD";
        let icon = "exclamation-circle-o";

        switch (allTickets[key].status) {
          case "In Progress":
            ticketNumberBG = "#72F2AD";
            icon = "exclamation-circle-o";
            break;
          case "Verifying":
            ticketNumberBG = "#F7CA18";
            icon = "exception";
            break;
          case "Done":
            ticketNumberBG = "#19b5Fe";
            icon = "check-circle-o";
            break;
          case "Queue":
            ticketNumberBG = "#Bf55ec";
            icon = "schedule";
            break;
          case "Planning":
            ticketNumberBG = "#F03434";
            icon = "calendar";
            break;
          case "Backlog":
            ticketNumberBG = "#cccccc";
            icon = "book";
            break;
          case "Archive":
            ticketNumberBG = "#f5f5f5";
            icon = "folder";
            break;

          default:
            break;
        }


        if ( allTickets[key].status === "Archive" ) {
          return;
        }

        return (
          <TicketCard
            onClick={() => {
              this.showTicketDetails(allTickets[key]);
            }}
            style={{ borderLeftColor: ticketNumberBG }}
            key={key}
          >
            <TicketNumber style={{ backgroundColor: ticketNumberBG }}>
              #{allTickets[key].ticketNumber}
            </TicketNumber>
            <TicketCardMeta>
              <Icon
                type={icon}
                style={{ color: ticketNumberBG, marginRight: "12px" }}
              />{" "}
              Last edited {lastUpdated} by {allTickets[key].by}
            </TicketCardMeta>
            <TicketTitle>{allTickets[key].title}</TicketTitle>
          </TicketCard>
        );
      });

      return <div style={{ marginTop: "20px" }}>{_.reverse(Tickets)}</div>;
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

  renderTickets(status) {
    if (this.props.ticketsByProject) {
      const allTickets = this.props.ticketsByProject;

      let Tickets = Object.keys(allTickets).map(key => {
        const lastUpdated = moment(allTickets[key].lastUpdated).format(
          "MM.DD.YY, h:mm a"
        );

        if (allTickets[key].status != status) {
          return;
        }

        let ticketNumberBG = "#72F2AD";
        let icon = "exclamation-circle-o";

        switch (status) {
          case "In Progress":
            ticketNumberBG = "#72F2AD";
            icon = "exclamation-circle-o";
            break;
          case "Verifying":
            ticketNumberBG = "#F7CA18";
            icon = "exception";
            break;
          case "Done":
            ticketNumberBG = "#19b5Fe";
            icon = "check-circle-o";
            break;
          case "Queue":
            ticketNumberBG = "#Bf55ec";
            icon = "schedule";
            break;
          case "Planning":
            ticketNumberBG = "#F03434";
            icon = "calendar";
            break;
          case "Backlog":
            ticketNumberBG = "#cccccc";
            icon = "book";
            break;
          case "Archive":
            ticketNumberBG = "#f5f5f5";
            icon = "folder";
            break;

          default:
            break;
        }

        return (
          <TicketCard
            onClick={() => {
              this.showTicketDetails(allTickets[key]);
            }}
            style={{ borderLeftColor: ticketNumberBG }}
            key={key}
          >
            <TicketNumber style={{ backgroundColor: ticketNumberBG }}>
              #{allTickets[key].ticketNumber}
            </TicketNumber>
            <TicketCardMeta>
              <Icon
                type={icon}
                style={{ color: ticketNumberBG, marginRight: "12px" }}
              />{" "}
              Last updated {lastUpdated} by {allTickets[key].by}
            </TicketCardMeta>
            <TicketTitle>{allTickets[key].title}</TicketTitle>
          </TicketCard>
        );
      });

      return <div style={{ marginTop: "20px" }}>{_.reverse(Tickets)}</div>;
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
    let ArchiveCount = 0;

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
        return item.status === "Queue";
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
      let archive = _.filter(this.props.ticketsByProject, function(item) {
        return item.status === "Archive";
      });
      ArchiveCount = archive.length;
    }

    const projectLastUpdated = this.props.projects.lastUpdated && moment(this.props.projects.lastUpdated).format(
      "MM.DD.YY @h:mm a"
    );


    if ( this.state.noProjectFound ) {
      return <Redirect to="/404" />
    }

    return (
      <LolipopAdmin>
        <Navigation
          collab={true}
          collaborator={this.state.collaborator}
          hasProjectDetails={true}
          handleNewProject={() => this.setState({ createNewProject: true })}
          collabTicketsLeft={this.props.ticketCredit}
        />

        <UI.PageContainerSmall>
          <UI.Box>
            <h1 style={{ fontWeight: 700, fontSize: "40px" }}>
              {this.props.projects.title}
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
                  flexDirection: "column"
                }}
              >
                <div>
                  <Tag style={{ marginLeft: "8px" }} color="geekblue">
                    <Icon type="clock-circle-o" /> last update:{" "}
                    {projectLastUpdated}
                  </Tag>
                </div>
              </div>
              <div>
              <small style={{marginRight: "8px"}}> Tickets remaining: {this.props.ticketCredit} </small>
                <Button
                  disabled={this.props.ticketCredit === 0}
                  type="primary"
                  onClick={() => this.setState({ createNewTicket: true })}
                >
                  New Ticket
                </Button>
            
              </div>
            </div>

            <Tabs style={{ marginTop: "60px" }} defaultActiveKey="1">
              <TabPane
                tab={`All (${
                  this.props.ticketsByProject
                    ? Number(inProgressCount) +
                      Number(verifyingCount) +
                      Number(doneCount) +
                      Number(inQueueCount) +
                      Number(planningCount) +
                      Number(backlogCount)
                    : "0"
                })`}
                key="1"
              >
                {this.renderAllTickets()}
              </TabPane>
              <TabPane tab={`In Progress (${inProgressCount})`} key="2">
                {this.renderTickets("In Progress")}
              </TabPane>
              <TabPane tab={`Verifying (${verifyingCount})`} key="3">
                {this.renderTickets("Verifying")}
              </TabPane>
              <TabPane tab={`Done (${doneCount})`} key="4">
                {this.renderTickets("Done")}
              </TabPane>
              <TabPane tab={`In Queue (${inQueueCount})`} key="5">
                {this.renderTickets("Queue")}
              </TabPane>
              <TabPane tab={`Planning (${planningCount})`} key="6">
                {this.renderTickets("Planning")}
              </TabPane>
              <TabPane tab={`Backlog (${backlogCount})`} key="7">
                {this.renderTickets("Backlog")}
              </TabPane>
              <TabPane tab={`Archive (${ArchiveCount})`} key="8">
                {this.renderTickets("Archive")}
              </TabPane>
            </Tabs>
          </UI.Box>
        </UI.PageContainerSmall>

        <Modal
          title={`Collaborator authentication`}
          visible={this.state.collaborator === "NOT SET"}
          okText="Authenticate"
          closable={false}
          footer={false}
        >
          <UI.FormField>
            <label>Email address</label>
            <Input
              onChange={e => {
                this.setState({ emailToCheck: e.target.value });
              }}
              placeholder="Please enter an authorized email address"
            />
          </UI.FormField>

          <UI.FormField>
            <Button onClick={() => this.authenticateEmail()} type="primary">
              Verify email
            </Button>
          </UI.FormField>
        </Modal>

        <Modal
          title={`New Ticket #${this.props.nextTicketNumber}`}
          visible={this.state.createNewTicket}
          onOk={() => this.createNewTicket()}
          onCancel={() => this.setState({ createNewTicket: false })}
          okText="Create ticket"
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
        </Modal>

        {/* EDIT TICKET MODAL */}

        <Modal
          title={`Ticket #${this.state.edit_ticketNumber}`}
          visible={this.state.show_edit_modal}
          onOk={() => this.editTicket()}
          onCancel={() => this.setState({ show_edit_modal: false })}
          okText="Save ticket"
          footer={this.props.ticketCredit === 0 ? false : true}

        >
          <UI.FormField>
            <label>Ticket Title</label>
            <Input
              value={this.state.edit_title}
              onChange={e => {
                this.setState({ edit_title: e.target.value });
              }}
              placeholder="Ticket title"
            />
          </UI.FormField>

          <UI.FormField>
            <label>Description</label>
            <TextArea
              style={{ marginTop: "4px", height: "150px" }}
              value={this.state.edit_description}
              onChange={e => {
                this.setState({ edit_description: e.target.value });
              }}
              placeholder="Ticket description"
            />
          </UI.FormField>

          <UI.FormField>
            <label>Time Estimate</label>
            <Input disabled value={`${this.state.edit_eta} days`} />
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
  nextTicketNumber,
  ticketCredit
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
    nextTicketNumber,
    ticketCredit
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCollaboratorProject: project =>
      dispatch({
        type: `SET_COLLABORATOR_PROJECT`,
        project
      }),
    setTicketsByProject: tickets =>
      dispatch({
        type: `SET_TICKETS_BY_PROJECT`,
        tickets
      }),
    setNextTicketNumber: number =>
      dispatch({
        type: `SET_NEXT_TICKET_NUMBER`,
        number
      }),
    setActiveProject: id =>
      dispatch({
        type: `SET_ACTIVE_PROJECT`,
        id
      }),
      setTicketCredit: credit =>
      dispatch({
        type: `SET_CREDIT`,
        credit
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Collaborate);
