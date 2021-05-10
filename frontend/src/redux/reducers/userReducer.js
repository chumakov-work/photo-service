import {LOGIN_USER, LOGOUT_USER, SET_USER_LOCATION} from "../types";

const initState = {
  loggedIn: false,
  data: null,
  location: null
}

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {...state, loggedIn: true, data: action.payload}
    case LOGOUT_USER:
      return initState
    case SET_USER_LOCATION:
      return {...state, location: action.payload}
    default:
      return state
  }
}

export default userReducer