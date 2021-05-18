import React from 'react'
import {connect} from 'react-redux'
import {getUnverifiedPosts} from './../redux/actions'
import Post from './../components/layout/Post'

const Admin = props => {
    if (!props.user) return <p>loading</p>

    if (!props.posts) props.getUnverifiedPosts()

    return (
        <main id="main-page">
            <div id="newest-posts" style={{margin: '50px'}}>
                <h4>Ожидают модерации</h4>
                {props.posts && props.posts.map(post => <Post post={post} unverified={true}/>)}
            </div>
        </main>
    )
}

const mapStateToProps = state => {
    return {
        posts: state.unverifiedPosts,
        user: state.user.data
    }
}

export default connect(mapStateToProps, {getUnverifiedPosts})(Admin)