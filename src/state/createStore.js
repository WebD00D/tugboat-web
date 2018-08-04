import { createStore as reduxCreateStore } from "redux";
import fire from "../fire";
import _ from "lodash";

const reducer = (state, action) => {
  if (action.type === `SET_PROJECTS`) {
    return Object.assign({}, state, {
      projects: action.projects
    });
  }

  if (action.type === `SET_NOTES`) {
    return Object.assign({}, state, {
      notes: action.notes
    });
  }

  if (action.type === `SET_TICKETS_BY_PROJECT`) {
    return Object.assign({}, state, {
      ticketsByProject: action.tickets
    });
  }

  if (action.type === `SET_NEXT_TICKET_NUMBER`) {
    return Object.assign({}, state, {
      nextTicketNumber: action.number
    });
  }

  if (action.type === `SET_ACTIVE_PROJECT`) {
    return Object.assign({}, state, {
      activeProjectId: action.id
    });
  }

  if (action.type === `SET_ACTIVE_CALENDAR`) {
    return Object.assign({}, state, {
      inProgressTickets: action.tickets
    });
  }


  return state;
};

const initialState = {
  userTypes: [`ADMIN`, `NON-ADMIN`],
  user: {
    authenticated: true,
    id: "bhI3RoqFdWZ6P0pGkzc4mCnjoRN2",
    type: `ADMIN`,
    email: "rva.christian91@gmail.com",
    name: "Christian Bryant"
  },

  notes: [],
  projects: [],
  activeProjectId: "ggtrrfwefkkfkr4",
  nextTicketNumber: 1000,

  tickets: [], // all app tickets
  ticketsByProject: [], // tickets for active project
  inProgressTickets: [], // these show up on the active calendar
};

const createStore = () =>
  reduxCreateStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
export default createStore;
