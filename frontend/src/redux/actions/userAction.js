import {SET_USER_LOCATION, GET_SOME_USER} from "../types"
import Api from './../../api/ApiClient'

export const userLocationAction = () => async dispatch => {
  const success = data => {
    const coords = {
      lat: data.coords.latitude,
      lon: data.coords.longitude
    }

   dispatch({type: SET_USER_LOCATION, payload: coords})
  }

  const error = data => {
    console.log(data)

    const coords = {
      lat: 0,
      lon: 0
    }

   dispatch({type: SET_USER_LOCATION, payload: coords})
  }

  navigator.geolocation.getCurrentPosition(success, error)
}

export const someUserAction = id => async dispatch => {
  await Api.user.getSomeUser(id).then(userData => {
    if (userData) dispatch({type: GET_SOME_USER, payload: userData.data})
  })
}
