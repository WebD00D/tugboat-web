import React, { PureComponent } from "react";
import Link from "gatsby-link";
import fire from "../fire";
import { Route, Redirect } from "react-router-dom";
import cx from "classnames";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { CirclePicker } from "react-color";

import BigCalendar from "react-big-calendar";
import moment from "moment";

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

import "whatwg-fetch";

import "../assets/styles.css";

import * as UI from "../components/ui/index";

import "react-big-calendar/lib/css/react-big-calendar.css";

import "antd/dist/antd.css";
import {
  Button,
  message,
  Modal,
  Input,
  Select,
  Icon,
  Tooltip,
  Timeline,
  Tabs
} from "antd";

const { Option, OptGroup } = Select;
const TabPane = Tabs.TabPane;

const { TextArea } = Input;

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

const TimelineItem = styled(Timeline.Item)`
  position: relative;
  padding-bottom: 30px;

  a {
    display: none;
    color: red;
    margin-bottom: 10px;
    position: absolute;
  }

  p {
    margin-bottom: 5px;
  }

  &:hover {
    a {
      display: block;
    }
  }
`;

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      createNewProject: false,
      newProjectVisibility: "private",
      newProjectTitle: "",
      newProjectColor: "",
      ticketId: "",

      calendar_ShowDetails: false,
      calendar_TicketNumber: "",
      calendar_Project: "",
      calendar_Title: "",
      calendar_Description: "",
      calendar_Status: "",
      calendar_Estimate: ""
    };
  }

  handleProjectSelection(id) {
    this.props.setProject(id);
    this.setState({
      ticketId: id
    });
  }

  renderProjects() {
    if (this.props.projects) {
      let AllProjects = this.props.projects;

      let Projects = Object.keys(AllProjects).map(key => {
        const lastUpdated = moment(AllProjects[key].lastUpdated).format(
          "MM.DD.YY, h:mm:ss a"
        ); // August 1st 2018, 8:43:23 pm

        return (
          <ProjectCard key={key}>
            <h3
              onClick={() => {
                this.handleProjectSelection(AllProjects[key].id);
              }}
              style={{ color: AllProjects[key].color }}
            >
              {AllProjects[key].title}
            </h3>
            <label>Last updated {lastUpdated}</label>

            <div className="project-card-actions">
              <Tooltip title="Quickly create a project ticket">
                <ProjectCardButton type="small">
                  Add Ticket <Icon type="file-add" />
                </ProjectCardButton>
              </Tooltip>

              <Tooltip title="Project settings">
                <ProjectCardButtonSmall type="small">
                  <Icon type="setting" />
                </ProjectCardButtonSmall>
              </Tooltip>
            </div>
          </ProjectCard>
        );
      });

      return (
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <span>
                <Icon type="code-o" />Projects
              </span>
            }
            key="1"
          >
            {!this.props.hasProjectDetails ? (
              <Button
                onClick={() => this.setState({ createNewProject: true })}
                type="primary"
                style={{ marginBottom: "12px" }}
              >
                <Icon type="plus-circle-o" /> New Project
              </Button>
            ) : (
              ""
            )}
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {Projects}
              <ProjectCard
                style={{
                  backgroundColor: "#f5f5f5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column"
                }}
              >
                <div style={{ marginBottom: "1px" }}>
                  <b>Get Unlimited Projects</b>
                </div>
                <div style={{ marginBottom: "12px" }}> $4.99 / month </div>

                <Link to="/upgrade">
                  <Icon type="star-o" style={{ color: "#DDC482" }} /> Upgrade
                  account
                </Link>
              </ProjectCard>
            </div>
          </TabPane>
          <TabPane
            style={{ height: "600px" }}
            tab={
              <span>
                <Icon type="calendar" />Calendar
              </span>
            }
            key="2"
          >
            <BigCalendar
              events={this.props.inProgressTickets}
              startAccessor="startDate"
              endAccessor="endDate"
              titleAccessor="title"
              views={["month", "agenda"]}
              components={{
                event: event => {
                  console.log(event);
                  return (
                    <div
                      onClick={() =>
                        this.setState({
                          calendar_ShowDetails: true,
                          calendar_TicketNumber: event.event.ticketNumber,
                          calendar_Project: event.event.project,
                          calendar_Title: event.event.title,
                          calendar_Description: event.event.description,
                          calendar_Status: event.event.status,
                          calendar_Estimate: event.event.estimate
                        })
                      }
                      style={{
                        borderRadius: "5px",
                        height: "23px",
                        paddingLeft: "5px",
                        backgroundColor: event.event.backgroundColor
                      }}
                    >
                      {`#${event.event.ticketNumber} - ${event.event.project}`}
                    </div>
                  );
                },
                agenda: {
                  event: event => {
                    return (
                      <span
                        onClick={() =>
                          this.setState({
                            calendar_ShowDetails: true,
                            calendar_TicketNumber: event.event.ticketNumber,
                            calendar_Project: event.event.project,
                            calendar_Title: event.event.title,
                            calendar_Description: event.event.description,
                            calendar_Status: event.event.status,
                            calendar_Estimate: event.event.estimate
                          })
                        }
                        style={{ color: event.event.backgroundColor }}
                      >
                        {`#${event.event.ticketNumber} - ${
                          event.event.project
                        }`}
                      </span>
                    );
                  }
                }
              }}
            />
            }
          </TabPane>
          <TabPane
            tab={
              <span>
                <Icon type="edit" />Notes
              </span>
            }
            key="3"
          >
            <div style={{ maxWidth: "600px" }}>
              <h2>Have something to jot down?</h2>
              <TextArea />
              <Button style={{ marginTop: "12px", float: "right" }}>
                Add Note
              </Button>

              <Timeline style={{ marginTop: "100px" }}>
                <TimelineItem>
                  <div style={{ color: "#ccc" }}>August 1, 2018 at 4:32p</div>
                  <p>
                    Lorem ipsum dolar set amit consectetur ipsum epicedae dfdf
                    dfd fdsjrewk reqr aer erek fagenda esheeem.
                  </p>
                  <a href="#">Delete</a>
                </TimelineItem>
                <TimelineItem>
                  <div style={{ color: "#ccc" }}>August 1, 2018 at 4:32p</div>
                  <p>
                    Lorem ipsum dolar set amit consectetur ipsum epicedae dfdf
                    dfd fdsjrewk reqr aer erek fagenda esheeem.
                  </p>
                  <a href="#">Delete</a>
                </TimelineItem>
              </Timeline>
            </div>
          </TabPane>
        </Tabs>
      );
    } else {
      return (
        <UI.FlexColumn>
          <NoProjectsImage src={require("../assets/icons/search.svg")} />
          <h2>
            <b>No projects found.</b>
          </h2>
          <Button onClick={() => this.setState({ createNewProject: true })}>
            Create your first project
          </Button>
          <HelpText>
            Want help? <Link to="/help/projects">Read this.</Link>
          </HelpText>
        </UI.FlexColumn>
      );
    }
  }

  handleNewProjectCreation() {
    const userId = this.props.user.id;

    const newPostKey = fire
      .database()
      .ref(`projects/`)
      .child(userId)
      .push().key;

    const projectData = {
      id: newPostKey,
      title: this.state.newProjectTitle,
      color: this.state.newProjectColor,
      visibility: this.state.newProjectVisibility,
      lastUpdated: Date.now()
    };

    var updates = {};
    updates[`/projects/${this.props.user.id}/${newPostKey}`] = projectData;

    fire
      .database()
      .ref()
      .update(updates);

    this.setState({
      newProjectTitle: "",
      newProjectColor: "",
      newProjectVisibility: "private",
      createNewProject: false
    });
  }

  componentDidMount() {
    fire
      .database()
      .ref(`/projects/${this.props.user.id}/`)
      .on(
        "value",
        function(snapshot) {
          console.log("PROJECTS", snapshot.val());

          this.props.setProjects(snapshot.val());
          // updateStarCount(postElement, snapshot.val());
        }.bind(this)
      );
  }

  render() {
    
    if (this.state.ticketId) {
      return <Redirect to={`/project?pid=${this.state.ticketId}`} />;
    }

    return (
      <LolipopAdmin>
        <Navigation />
        <UI.PageContainer>
          <UI.Box>{this.renderProjects()}</UI.Box>
        </UI.PageContainer>

        {/* MODALS */}

        <Modal
          title={`#${this.state.calendar_TicketNumber} - ${
            this.state.calendar_Project
          }`}
          visible={this.state.calendar_ShowDetails}
          onOk={() => this.setState({ calendar_ShowDetails: false })}
          onCancel={() => this.setState({ calendar_ShowDetails: false })}
        >
          <UI.FormField>
            <label>Title</label>
            <p>{this.state.calendar_Title}</p>
          </UI.FormField>

          <UI.FormField>
            <label>Description</label>
            <p>{this.state.calendar_Description}</p>
          </UI.FormField>

          <UI.FormField>
            <label>Time Estimate</label>
            <p>{this.state.calendar_Estimate}</p>
          </UI.FormField>

          <UI.FormField>
            <label>Status</label>
            <p>{this.state.calendar_Status}</p>
          </UI.FormField>
        </Modal>

        <Modal
          title="New Project"
          visible={this.state.createNewProject}
          onOk={() => this.handleNewProjectCreation()}
          onCancel={() => this.setState({ createNewProject: false })}
          okText="Create project"
        >
          <UI.FormField>
            <label>Project Title</label>
            <Input
              onChange={e => {
                this.setState({ newProjectTitle: e.target.value });
              }}
              placeholder="Project title"
            />
          </UI.FormField>

          <UI.FormField>
            <label>Color</label>
            <CirclePicker
              color={this.state.newProjectColor}
              onChangeComplete={color => {
                this.setState({ newProjectColor: color.hex });
              }}
            />
          </UI.FormField>

          <UI.FormField>
            <label>Visibility</label>
            <Select
              defaultValue="private"
              onChange={val => {
                this.setState({ newProjectVisibility: val });
              }}
              style={{ width: "280px", display: "block" }}
            >
              <OptGroup label="Only visible to participating members.">
                <Option value="private">
                  <Icon type="lock" /> Private
                </Option>
              </OptGroup>
              <OptGroup label="Visible to anyone with link.">
                <Option value="public">
                  <Icon type="global" /> Public
                </Option>
              </OptGroup>
            </Select>
          </UI.FormField>
        </Modal>
      </LolipopAdmin>
    );
  }
}

const mapStateToProps = ({ user, projects, inProgressTickets, activeProjectId }) => {
  return { user, projects, inProgressTickets, activeProjectId };
};

const mapDispatchToProps = dispatch => {
  return {
    setProjects: projects =>
      dispatch({
        type: `SET_PROJECTS`,
        projects
      }),
    setProject: id =>
      dispatch({
        type: `SET_ACTIVE_PROJECT`,
        id
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
