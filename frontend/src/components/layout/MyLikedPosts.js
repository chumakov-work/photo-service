import React from 'react'
import Post from './Post'

const MyLikedPosts = props => {
    return (
        <div id="newest-posts" style={{width: '100%'}}>
            {props.posts && props.posts.map(post => <Post post={post} fromProfile={true}/>)}
        </div>
    )
}

export default MyLikedPosts