import React from 'react'
import {connect} from "react-redux"
import {getVerifiedPosts} from "../redux/actions"
import Post from "../components/layout/Post"

const HomePage = (props) => {
  if (!props.posts) props.getVerifiedPosts()

  return (
    <main id="main-page">
      <div id="newest-posts" style={{margin: '50px'}}>
        <h4>Самые новые</h4>
        {props.posts && props.posts.map(post => <Post post={post} unverified={false}/>)}
      </div>
    </main>
  )
}

const mapStateToProps = state => {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps, {getVerifiedPosts})(HomePage)