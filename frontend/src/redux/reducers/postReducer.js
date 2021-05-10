import {LOAD_POSTS} from "../types";

const initState = null

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return action.payload
    default:
      return state
  }
}

export default userReducer