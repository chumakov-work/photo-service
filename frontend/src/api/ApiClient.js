import axios from 'axios'
import {toast} from 'react-toastify'
import Cookies from "universal-cookie"
import history from './../components/common/HistoryComponent'
import {BACKEND_ADDR} from "../Config";

const cookies = new Cookies()

// Axios presets
axios.defaults.baseURL = BACKEND_ADDR
axios.interceptors.response.use(null, err => {
  if (err.response && err.response.data.error && JSON.stringify(err.response.data.message) === '{}') {
    toast.error("Непредвиденная ошибка")
    return
  }

  if (err.response && err.response.status === 498) {
    history.push('/login')
    return
  }

  if (err.response && err.response.data.error) {
    toast.error(err.response.data.message)
  }
})
axios.interceptors.request.use(
  config => {
    const token = cookies.get('token')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config;
  },
  error => {
    Promise.reject(error).then()
  }
)

// Requests
const signup = userData => {
  return axios.post('/signup', userData)
}

const login = userData => {
  return axios.post('/login', userData)
}

const getCurrentUser = () => {
  return axios.get('/me')
}

const uploadImage = image => {
  return axios.post('/post-image', image, {
    headers: {'Content-Type': 'multipart/form-data; boundary=photo-service'},
  })
}

const createPost = post => {
  return axios.post('/post', post)
}

const getAllPosts = () => {
  return axios.get('/posts')
}

const likePost = id => {
  return axios.get(`/like/${id}`)
}

const getPostsOnVerification = () => {
  return axios.get('/posts/unverified')
}

const verifyPost = id => {
  return axios.get(`/post/verify/${id}`)
}

const deletePost = id => {
  return axios.delete(`/post/${id}`)
}

// eslint-disable-next-line
export default {
  auth: {
    signup, login
  },
  user: {
    getCurrentUser
  },
  post: {
    uploadImage, createPost, getAllPosts, likePost, getPostsOnVerification, verifyPost, deletePost
  }
}