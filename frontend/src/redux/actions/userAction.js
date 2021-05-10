import {SET_USER_LOCATION} from "../types"

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
  }

  navigator.geolocation.getCurrentPosition(success, error)
}
