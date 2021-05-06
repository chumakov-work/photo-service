import axios from 'axios'
import {toast} from 'react-toastify'
import history from './../components/common/HistoryComponent'

import Cookies from "universal-cookie"
const cookies = new Cookies()

// Axios presets
axios.defaults.baseURL = 'http://localhost:5000'
axios.interceptors.response.use(null, err => {
  if (err.response.status === 498) {
    history.push('/login')
    return
  }

  if (err.response.data.error) {
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

// eslint-disable-next-line
export default {
  auth: {
    signup, login
  }
}