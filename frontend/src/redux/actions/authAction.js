import Api from './../../api/ApiClient'
import history from './../../components/common/HistoryComponent'
import {LOGIN_USER, LOGOUT_USER} from "../types"
import {toast} from "react-toastify"

import Cookies from "universal-cookie"
const cookies = new Cookies()

export const signupAction = userData => async dispatch => {
  const signuped = await Api.auth.signup(userData).then(res => {
    if (res) {
      toast.success('Пользователь успешно создан')
      return true
    }
  })

  if (signuped) {
    await Api.auth.login(userData).then(res => {
      if (res) {
        const token = res.data.data.token
        cookies.set('token', token)

        Api.user.getCurrentUser().then(res => {
          const payload = res.data
          dispatch({type: LOGIN_USER, payload})
          history.push('/me')
        })
      }
    })
  }
}

export const loginAction = userData => async dispatch => {
  await Api.auth.login(userData).then(res => {
    if (res) {
      const token = res.data.data.token
      cookies.set('token', token)

      Api.user.getCurrentUser().then(res => {
        const payload = res.data
        dispatch({type: LOGIN_USER, payload})
        history.push('/me')
      })
    }
  })
}

export const logoutAction = () => async dispatch => {
  cookies.remove('token')
  history.push('/login')
  dispatch({type: LOGOUT_USER})
}

export const isLoggedIn = () => async dispatch => {
  const token = cookies.get('token')

  if (!token) {
    logoutAction()
    return
  }

  Api.user.getCurrentUser().then(res => {
    if (res) {
      const payload = res.data
      dispatch({type: LOGIN_USER, payload})
    }
  })
}