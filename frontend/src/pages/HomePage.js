import React, { useState } from 'react'
import {connect} from "react-redux"
import {getVerifiedPosts} from "../redux/actions"
import Post from "../components/layout/Post"
import GoogleMap from './../components/layout/GoogleMap'

import "./../styles/homePage.css"

const HomePage = props => {
  const [filterText, changeFilterText] = useState("")
  const [filteredPosts, changeFilteredPosts] = useState([])
  if (!props.posts) props.getVerifiedPosts()

  const filterPosts = text => {
    changeFilterText(text)
    const posts = []

    // posts.map(post => console.log(post))
    props.posts.map(post => post.tags.map(tag => tag.includes(filterText) && posts.push(post)))
    changeFilteredPosts(posts)
  }

  return (
    <main id="homePage">
      <section>
        <input id="filteringInput" type="text" value={filterText} placeholder="Начниете печатать название" onChange={event => filterPosts(event.target.value)}/>
      </section>

      <section id="main-page">
        {!filterText && <div id="newest-posts" style={{margin: '50px'}}>
          <h4>Самые новые</h4>
          {props.posts && props.posts.map(post => <Post post={post} unverified={false}/>)}
        </div>}

        {filterText && <div id="newest-posts" style={{margin: '50px'}}>
          <h4>Самые новые</h4>
          {filteredPosts && filteredPosts.map(post => <Post post={post} unverified={false}/>)}
        </div>}

        <div id="map">
          <GoogleMap posts={props.posts}/>
        </div>
      </section>
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