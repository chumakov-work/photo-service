import {LIKE_POST, LOAD_POSTS, LOAD_UNVERIFIED_POSTS, VERIFY_POST, DELETE_POST} from "../types";

const initState = null

export const postReducer = (state = initState, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return action.payload
    case LIKE_POST:
      return action.payload
    default:
      return state
  }
}

export const unverifiedPostsReducers = (state = null, action) => {
  switch (action.type) {
    case LOAD_UNVERIFIED_POSTS:
      return action.payload
    case VERIFY_POST:
      return action.payload
    case DELETE_POST:
      return action.payload
    default:
      return state
  }
}