import {LOGIN_USER, LOGOUT_USER, SET_USER_LOCATION, GET_SOME_USER} from "../types";

const initState = {
  loggedIn: false,
  data: null,
  location: null
}

export const userReducer = (state = initState, action) => {
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

export const someUserReducer = (state = null, action) => {
  switch (action.type) {
    case GET_SOME_USER:
      return action.payload
    default:
      return state
  }
}
