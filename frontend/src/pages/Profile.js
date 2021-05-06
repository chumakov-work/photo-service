import React from 'react'
import {connect} from "react-redux"
import {logoutAction} from "../redux/actions/authAction";

const Profile = props => {
  return (
    <main>
      <h6>Profile</h6>
      <button onClick={props.logoutAction}>Logout</button>
    </main>
  )
}

export default connect(null, {logoutAction})(Profile)