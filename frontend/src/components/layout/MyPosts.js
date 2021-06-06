import React from 'react'
import Post from './Post'

const MyPosts = props => {
  return (
    <div id="newest-posts" style={{width: '100%'}}>
      {props.posts && props.posts.length > 0 ? props.posts.map(post => post?.length > 0 ?
        <Post post={post[0]} unverified={false}/> : <Post post={post} unverified={false}/>) : <p>Тут пусто</p>}
    </div>
  )
}

export default MyPosts