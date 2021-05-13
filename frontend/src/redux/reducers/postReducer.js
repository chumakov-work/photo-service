import {LIKE_POST, LOAD_POSTS} from "../types";

const initState = null

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return action.payload
    case LIKE_POST:
      return action.payload
    default:
      return state
  }
}

export default postReducer