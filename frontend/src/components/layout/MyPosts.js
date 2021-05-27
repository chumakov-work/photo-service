import React from 'react'
import Post from './Post'

const MyPosts = props => {
    return (
        <div id="newest-posts" style={{width: '100%'}}>
            {props.posts && props.posts.map(post => post.length > 0 ? <Post post={post[0]} unverified={false}/> : <Post post={post} unverified={false}/>)}
        </div>
    )
}

export default MyPosts