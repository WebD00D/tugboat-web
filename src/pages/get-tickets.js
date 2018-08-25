import React, { PureComponent } from 'react';
import Link from 'gatsby-link';
import fire from '../fire';
import { Route, Redirect } from 'react-router-dom';
import cx from 'classnames';
import styled from 'styled-components';
import _ from 'lodash';
import { connect } from 'react-redux';
import { CirclePicker } from 'react-color';

import BigCalendar from 'react-big-calendar';
import moment from 'moment';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

import 'whatwg-fetch';

import '../assets/styles.css';

import * as UI from '../components/ui/index';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import 'antd/dist/antd.css';
import {
  Button,
  message,
  Modal,
  Input,
  Select,
  Icon,
  Tooltip,
  Timeline,
  List,
  Tabs,
  Alert
} from 'antd';

const { Option, OptGroup } = Select;
const TabPane = Tabs.TabPane;

const { TextArea } = Input;

import LolipopAdmin from '../themes/lolipop-admin';
import Navigation from '../components/navigation/index';

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
  cursor: pointer;

  @media (max-width: 700px) {
    margin-right: 0px;
    width: 100%;
    max-width: 100%;
    height: 120px;
  }

  h3 {
    margin-bottom: 0px;
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

const TicketContainer = styled.div`
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  background-color: #fff;
  border-radius: 4px;
  padding-bottom: 0px;
  margin-top: 50px;

  h1 {
    color: #252525;
    text-align: center;
  }
`;

const ListItem = styled(List.Item)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }

  h2 {
    margin-bottom: 0px;
    color: rgb(24, 144, 255);
  }
`;

class GetTickets extends PureComponent {
  constructor(props) {
    super(props);

    this.handleCheckout = this.handleCheckout.bind(this);

    this.state = {
      activeTicket: '',
      token: 'NOT SET',
      checkoutText: 'Checkout'
    };
  }

  componentDidMount() {}

  handleCheckout() {
    this.setState({
      checkoutText: '...'
    });

    let amount;

    switch (this.state.activeTicket) {
      case '50':
        amount = 199;
        break;
      case '100':
        amount = 349;
        break;
      case '250':
        amount = 599;
        break;
      default:
        amount = 50;
        break;
    }

    const handler = StripeCheckout.configure({
      key: 'pk_test_4MuZQsjjPxygGfpjv1SRbbrX',
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: function(token) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        const dev = false;
        const env = dev ? 'http://localhost:8091' : 'https://tugboatapi.herokuapp.com/'
        fetch(
          `${env}/payment?token=${token.id}&amount=${amount}`
        )
          .then(function(response) {
            return response.json();
          })
          .then(function(r) {
            console.log('RESPONSE', r);

            if (r.paid) {
              // Update Users Tickets..
              // Save Transaction Id's

              let updates = {};

              let ticketsToAdd = Number(this.state.activeTicket);

              updates[`/credits/${this.props.user.id}/tickets/`] =
                Number(this.props.ticketCredit) + ticketsToAdd;

              fire
                .database()
                .ref()
                .update(updates);

              message.success(`Added ${this.state.activeTicket} tickets!`);

            }
          }.bind(this));

        this.setState({
          token: token.id,
          checkoutText: 'Checkout'
        });

      }.bind(this)
    });

    handler.open({
      name: 'Tugboat',
      description: `${this.state.activeTicket} tickets`,
      amount: amount
    });
  }

  render() {
    if (this.state.ticketId) {
      return <Redirect to={`/project?pid=${this.state.ticketId}`} />;
    }

    return (
      <LolipopAdmin>
        <Navigation />
        <UI.PageContainer>
        <Link to="/projects"><Icon type="arrow-left" /> Back to Projects</Link>

          <TicketContainer>
            <UI.Box>
              <h1>Purchase Tickets</h1>
              <List size="large" bordered>
                <ListItem onClick={() => this.setState({ activeTicket: '50' })}>
                  <div>
                    <h2>50 Tickets </h2>
                    $1.99
                  </div>
                  <Icon
                    className={
                      this.state.activeTicket === '50'
                        ? 'active-ticket'
                        : 'inactive-ticket'
                    }
                    type="check-circle"
                  />
                </ListItem>
                <ListItem
                  onClick={() => this.setState({ activeTicket: '100' })}
                >
                  <div>
                    <h2>100 Tickets </h2>
                    $3.49
                  </div>
                  <Icon
                    className={
                      this.state.activeTicket === '100'
                        ? 'active-ticket'
                        : 'inactive-ticket'
                    }
                    type="check-circle"
                  />
                </ListItem>
                <ListItem
                  onClick={() => this.setState({ activeTicket: '250' })}
                >
                  <div>
                    <h2>250 Tickets </h2>
                    $5.99
                  </div>
                  <Icon
                    className={
                      this.state.activeTicket === '250'
                        ? 'active-ticket'
                        : 'inactive-ticket'
                    }
                    type="check-circle"
                  />
                </ListItem>
              </List>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  onClick={() => this.handleCheckout()}
                  style={{ marginTop: '15px', width: '250px' }}
                  type="primary"
                  size="large"
                >
                  {this.state.checkoutText}
                </Button>
              </div>
            </UI.Box>
          </TicketContainer>
        </UI.PageContainer>
      </LolipopAdmin>
    );
  }
}

const mapStateToProps = ({
  user,
  projects,
  inProgressTickets,
  activeProjectId,
  notes,
  ticketCredit
}) => {
  return {
    user,
    projects,
    inProgressTickets,
    activeProjectId,
    notes,
    ticketCredit
  };
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
      }),
    setActiveCalendar: tickets =>
      dispatch({
        type: `SET_ACTIVE_CALENDAR`,
        tickets
      }),
    setNotes: notes =>
      dispatch({
        type: `SET_NOTES`,
        notes
      }),
    setTicketCredit: credit =>
      dispatch({
        type: `SET_CREDIT`,
        credit
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GetTickets);
