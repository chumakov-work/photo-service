import React, {useEffect} from 'react'
import {connect} from "react-redux"
import {getAllPostsAction} from "../redux/actions"
import Post from "../components/layout/Post"

const HomePage = (props) => {
  useEffect(() => {
    if (!props.posts) props.getAllPostsAction()
  })

  return (
    <main id="main-page">
      <div id="newest-posts" style={{margin: '50px'}}>
        <h4>Самые новые</h4>
        {props.posts && props.posts.map(post => <Post post={post} />)}
      </div>
    </main>
  )
}

const mapStateToProps = state => {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps, {getAllPostsAction})(HomePage)