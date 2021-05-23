import React, {useEffect, useState} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from "react-redux"

import {someUserAction} from "../redux/actions"
import Post from './../components/layout/Post'
import './../styles/profile.css'
import {compose} from 'redux';

const Profile = props => {
  useEffect(() => {
      if (!props.user) props.someUserAction(props.match.params.login)
  })

  if (!props.user) return <p>Загрузка ...</p>

  console.log(props)

  return (
    <main id="profilePage" style={{display: 'flex'}}>
      <div className="liked">
        <h3 className="title">Посты</h3>
        {props.user.posts && props.user.posts.length > 0 ? props.user.posts.map(post => post && post.length > 0 && <Post post={post[0]} unverified={false}/>): "Постов нет"}
      </div>
      <div className="info" style={{marginLeft: '25px'}}>
          <h3>Информация</h3>
          <p>Имя: {props.user.name}</p>
          <p>ID: {props.user._id}</p>
          <p>Логин: {props.user.login}</p>
      </div>
    </main>
  )
}

const mapStateToProps = state => {
  return {
    user: state.someUser
  }
}

export default compose(connect(mapStateToProps, {someUserAction}), withRouter)(Profile)