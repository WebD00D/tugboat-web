import { createStore as reduxCreateStore } from "redux";
import fire from "../fire";
import _ from "lodash";

const reducer = (state, action) => {

  if ( action.type === `SET_PROJECTS` ) {
    return Object.assign({}, state, {
      projects: action.projects 
    })
  }

  if ( action.type === `SET_TICKETS_BY_PROJECT` ) {
    return Object.assign({}, state, {
      ticketsByProject: action.tickets 
    })
  }

  if ( action.type === `SET_NEXT_TICKET_NUMBER` ) {
    return Object.assign({}, state, {
      nextTicketNumber: action.number 
    })
  }

  

  if ( action.type === `SET_ACTIVE_PROJECT` ) {
    return Object.assign({}, state, {
      activeProjectId: action.id 
    })
  }



  return state;
};

const initialState = {
  userTypes: [`ADMIN`, `NON-ADMIN`],
  user: {
    authenticated: true,
    id: 'bhI3RoqFdWZ6P0pGkzc4mCnjoRN2',
    type: `ADMIN`,
    email: "rva.christian91@gmail.com",
    name: "Christian Bryant"
  },

  projects: [],
  activeProjectId: 'ggtrrfwefkkfkr4',
  nextTicketNumber: 1000,

  tickets: [ ], // all app tickets
  ticketsByProject: [], // tickets for active project


  inProgressTickets: [
    {
      ticketNumber: "3739",
      project: "Workpath",
      title: "Bug fix for lorem ipsum",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      startDate: new Date('2018', '07', '01'),
      endDate: new Date('2018', '07', '04'),
      backgroundColor: '#E09B80',
      status: "In Progress",
      estimate: "3"
    },
    {
      ticketNumber: "3737",
      project: "Maya",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      title: "Lorem ipsum dolar set",
      startDate: new Date('2018', '07', '01'),
      endDate: new Date('2018', '07', '02'),
      backgroundColor: '#1890ff',
      status: "In Progress",
      estimate: "2"
    },
    {
      ticketNumber: "3740",
      project: "Maya",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      title: "Question to answer for a feature",
      startDate: new Date('2018', '07', '02'),
      endDate: new Date('2018', '07', '04'),
      backgroundColor: '#1890ff',
      status: "Verifying",
      estimate: "1"
    },
    {
      ticketNumber: "3902",
      project: "Maya",
      title: "Unable to login on Safari",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      startDate: new Date('2018', '07', '06'),
      endDate: new Date('2018', '07', '09'),
      backgroundColor: '#1890ff',
      status: "Verifying",
      estimate: "3"
    },
  ]

};

const createStore = () =>
  reduxCreateStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
export default createStore;

