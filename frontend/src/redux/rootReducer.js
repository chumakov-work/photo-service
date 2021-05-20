import {combineReducers} from "redux"

// Reducers
import userReducer from "./reducers/userReducer"
import {postReducer, unverifiedPostsReducers, signlePostReducer} from "./reducers/postReducer"

export const rootReducer = combineReducers({
  user: userReducer,
  posts: postReducer,
  unverifiedPosts: unverifiedPostsReducers,
  singlePost: signlePostReducer
})