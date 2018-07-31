import { createStore as reduxCreateStore } from "redux";
import fire from "../fire";
import _ from "lodash";

const reducer = (state, action) => {

  if (action.type === `CREATE_COURIER`) {
    return Object.assign({}, state, {
      user: action.user,
      courier: action.courier
    });
  }

  if ( action.type === `ADD_ZONE` ) {
    
    return Object.assign({}, state, {
      zones: [...state.zones, action.zone]
    })
  }

  if ( action.type === `SET_ZONES` ) {
    return Object.assign({}, state, {
      zones: action.zones 
    })
  }

  return state;
};

const initialState = {
  userTypes: [`COURIER`, `MERCHANT`, `SHOPPER`],

  // user: {},
  // courier: {},

  user: {
    authenticated: true,
    id: 'ok8Z3Emd8PMvRodsGPiaubIpHTK2',
    type: `COURIER`,
    email: "rva.christian91@gmail.com",
    name: "Christian Bryant"
  },

  courier: {
    id: 'ok8Z3Emd8PMvRodsGPiaubIpHTK2',
    company: "Quickness RVA",
    contactName: "Christian Bryant",
    contactEmail: "rva.christian91@gmail.com",
    contactPhone: "804.555.5555",
    city: "Richmond",
    state: "VA",
    zip: "23233",
    authenticationEmail: "rva.christian91@gmail.com"
  },


  zones: [],
  merchants: [],
  twinjetAPI: null
};

const createStore = () =>
  reduxCreateStore(
    reducer,
    initialState
   // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
export default createStore;

// const user = {
//   authenticated: true,
//   id: courierId,
//   type: `COURIER`,
//   email: this.state.loginEmail,
//   name: this.state.contactPerson
// };

// const courier = {
//   id: courierId,
//   contactName: this.state.contactPerson,
//   contactEmail: this.state.email,
//   contactPhone: this.state.phone,
//   city: this.state.city,
//   state: this.state.usState,
//   zip: this.state.zip,
//   authenticationEmail: this.state.loginEmail
// };
