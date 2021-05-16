import Api from './../../api/ApiClient'
import {BACKEND_ADDR} from "../../Config"
import {LIKE_POST, LOAD_POSTS, LOAD_UNVERIFIED_POSTS, DELETE_POST, VERIFY_POST} from "../types";

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

export const likePost = (posts, id) => async dispatch => {
  await Api.post.likePost(id).then(res => {
    if (res) {
      const likedPost = res.data.post
      const likedPosts = []

      if (posts) {
        posts.forEach(post => {
          if (post._id && post._id === id) {
            likedPosts.push(likedPost)
          } else {
            likedPosts.push(post)
          }
        })
      }

      dispatch({type: LIKE_POST, payload: likedPosts})
    }
  })
}

export const getVerifiedPosts = () => async dispatch => {
  await Api.post.getAllPosts().then(res => {
    if (res) dispatch({type: LOAD_POSTS, payload: res.data})
  })
}

export const getUnverifiedPosts = () => async dispatch => {
  await Api.post.getPostsOnVerification().then(res => {
    if (res) dispatch({type: LOAD_UNVERIFIED_POSTS, payload: res.data})
  })
}

export const verifyPost = (posts, id) => async dispatch => {
  await Api.post.verifyPost(id).then(res => {
    if (res) {
      const updatedPosts = posts.filter(post => post._id !== id)
      dispatch({type: VERIFY_POST, payload: updatedPosts})
    }
  })
}

export const deletePost = (posts, id) => async dispatch => {
  await Api.post.deletePost(id).then(res => {
    if (res) {
      const updatedPosts = posts.filter(post => post._id !== id)
      dispatch({type: DELETE_POST, payload: updatedPosts})
    }
  })
}