import React, { useEffect, useState } from 'react'
import {connect} from "react-redux"
import {getVerifiedPosts} from "../redux/actions"
import Post from "../components/layout/Post"
import GoogleMap from './../components/layout/GoogleMap'

import "./../styles/homePage.css"

const HomePage = props => {
  const [fixedPosts, changeFixedPosts] = useState(false)
  if (!props.posts) props.getVerifiedPosts()

  useEffect(() => {
    console.log('rendered HomePage.js')
    if (props.posts) changeFixedPosts(true)
  })

  return (
    <main id="main-page">
      <div id="newest-posts" style={{margin: '50px'}}>
        <h4>Самые новые</h4>
        {props.posts && props.posts.map(post => <Post post={post} unverified={false}/>)}
      </div>

      <div id="map">
        {fixedPosts && <GoogleMap posts={props.posts}/>}
      </div>
    </main>
  )
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
    user: state.user
  }
}

export default connect(mapStateToProps, {getVerifiedPosts})(HomePage)