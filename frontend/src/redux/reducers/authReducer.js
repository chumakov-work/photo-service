import {LOGIN_USER, LOGOUT_USER} from "../types";

const authReducer = (state = {loggedIn: false, data: null}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {...state, loggedIn: true, data: action.payload}
    case LOGOUT_USER:
      return {...state, loggedIn: false, data: null}
    default:
      return state
  }
}

export default authReducer