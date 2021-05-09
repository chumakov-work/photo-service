import Api from './../../api/ApiClient'
import {BACKEND_ADDR} from "../../Config";

export const newPost = (description, image) => async dispatch => {
  await Api.post.uploadImage(image).then(res => {
   Api.post.createPost({
      imagePath: `${BACKEND_ADDR}/post/image/${res.data.filename}`,
      description,
      author: null
    }).then(result => {
      console.log(result)
    })
  })
}