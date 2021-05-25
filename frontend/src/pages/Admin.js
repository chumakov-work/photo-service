import React from 'react'
import {connect} from 'react-redux'
import {getUnverifiedPosts} from './../redux/actions'
import Post from './../components/layout/Post'

const Admin = props => {
    if (!props.user) return <p>loading</p>

    if (!props.posts) props.getUnverifiedPosts()

    return (
        <main id="admin-page">
            <div>
                <h4 style={{margin: '50px'}}>Ожидают модерации</h4>
                <div style={{margin: '50px'}}>{props.posts && props.posts.map(post => <Post post={post} unverified={true}/>)}</div>
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