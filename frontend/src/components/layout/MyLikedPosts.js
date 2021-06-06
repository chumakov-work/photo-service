import React from 'react'
import Post from './Post'

const MyLikedPosts = props => {
    return (
        <div id="newest-posts" style={{width: '100%'}}>
            {props.posts && props.posts.length > 0 ? props.posts.map(post => post?.length > 0 &&
              <Post post={post} fromProfile={true}/>) : <p>Тут пусто</p>}
        </div>
    )
}

export default MyLikedPosts