import Api from './../../api/ApiClient'
import history from './../../components/common/HistoryComponent'
import {LOGIN_USER, LOGOUT_USER} from "../types"
import {toast} from "react-toastify"

import Cookies from "universal-cookie"
const cookies = new Cookies()

export const signupAction = userData => async dispatch => {
  await Api.auth.signup(userData).then(res => {
    toast.success('Пользователь успешно создан')
    // loginAction(userData)
  })
}

export const loginAction = userData => async dispatch => {
  await Api.auth.login(userData).then(res => {
    const token = res.data.data.token

    cookies.set('token', token)
    dispatch({type: LOGIN_USER})
  })
}

export const logoutAction = () => async dispatch => {
  cookies.remove('token')
  dispatch({type: LOGOUT_USER})
  history.push('/login')
}

export const isLoggedIn = () => async dispatch => {
  const token = cookies.get('token')

  if (!token) {
    logoutAction()
    return
  }

  dispatch({type: LOGIN_USER})
}


//