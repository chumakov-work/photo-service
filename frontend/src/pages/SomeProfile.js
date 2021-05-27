import React, {useEffect, useState} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from "react-redux"

import {someUserAction} from "../redux/actions"
import './../styles/profile.css'
import {compose} from 'redux';
import MyPosts from './../components/layout/MyPosts'

const Profile = props => {
  useEffect(() => {
      if (!props.user) props.someUserAction(props.match.params.login)
  })

  if (!props.user) return <p>Загрузка ...</p>

  return (
    <main id="profilePage">
      <div className="info" style={{margin: '25px 0'}}>
          <h3>Информация</h3>
          <p>Имя: {props.user.name}</p>
          <p>ID: {props.user._id}</p>
          <p>Логин: {props.user.login}</p>
      </div>

      <MyPosts posts={props.user.posts && props.user.posts.length > 0 && props.user.posts}/>
    </main>
  )
}

const mapStateToProps = state => {
  return {
    user: state.someUser
  }
}

export default compose(connect(mapStateToProps, {someUserAction}), withRouter)(Profile)