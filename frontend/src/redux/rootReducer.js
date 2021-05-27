import {combineReducers} from "redux"

// Reducers
import {userReducer, someUserReducer} from "./reducers/userReducer"
import {postReducer, unverifiedPostsReducers, signlePostReducer, locateThePost} from "./reducers/postReducer"

export const rootReducer = combineReducers({
  user: userReducer,
  posts: postReducer,
  unverifiedPosts: unverifiedPostsReducers,
  singlePost: signlePostReducer,
  someUser: someUserReducer,
  postLocation: locateThePost
})