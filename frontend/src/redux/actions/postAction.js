import Api from './../../api/ApiClient'
import {BACKEND_ADDR} from "../../Config";
import {LOAD_POSTS} from "../types";

export const newPostAction = (description, image, coords) => async dispatch => {
  await Api.post.uploadImage(image).then(res => {
   Api.post.createPost({
      imagePath: `${BACKEND_ADDR}/post/image/${res.data.filename}`,
      description,
      author: null,
      location: coords
    }).then(result => {
      console.log(result)
    })
  })
}

export const getAllPostsAction = () => async dispatch => {
  await Api.post.getAllPosts().then(res => dispatch({type: LOAD_POSTS, payload: res.data}))
}