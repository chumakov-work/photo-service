import React, { useState } from 'react'
import {connect} from "react-redux"
import {getVerifiedPosts} from "../redux/actions"
import Post from "../components/layout/Post"
import GoogleMap from './../components/layout/GoogleMap'
import ProfileSlides from './../components/layout/ProfileSlides'

import "./../styles/homePage.css"

const HomePage = props => {
  const [filterText, changeFilterText] = useState("")
  const [filteredPosts, changeFilteredPosts] = useState([])
  if (!props.posts) props.getVerifiedPosts()

  const filterPosts = text => {
    changeFilterText(text)
    const posts = []

    props.posts.map(post => post.tags.map(tag => tag.includes(filterText) && posts.push(post)))

    if (posts.length < 1) {
      changeFilteredPosts(null)
      return
    }

    changeFilteredPosts(posts)
  }

  return (
    <main id="homePage">
      <section>
        <p style={{textAlign: 'center', margin: '15px 0'}}>Сервис обмена фотографиями</p>
      </section>

      <section>
        <input id="filteringInput" type="text" value={filterText} placeholder="Начниете печатать название" onChange={event => filterPosts(event.target.value)}/>
      </section>

      <div id="map">
        {props.postLocation && <GoogleMap/>}
        {!filterText && <GoogleMap/>}
        {filterText && <GoogleMap filteredPosts={filteredPosts}/>}
      </div>

      <section id="main-page">
        {filterText && <div>
          <h4>Результаты</h4>
          <div id="newest-posts">{filteredPosts !== null ? filteredPosts.map(post => <Post post={post} unverified={false}/>) : <p>Ничего не найдено</p>}</div>
        </div>}

        <div style={{width: '80%', margin: '0 auto'}}>
          <ProfileSlides myPosts={props.posts && props.posts} likedPosts={props.posts && props.posts} from={'home'}/>
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