import {LOGIN_USER, LOGOUT_USER} from "../types";

const authReducer = (state = {loggedIn: false}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {...state, loggedIn: true}
    case LOGOUT_USER:
      return {...state, loggedIn: false}
    default:
      return state
  }
}

export default authReducer