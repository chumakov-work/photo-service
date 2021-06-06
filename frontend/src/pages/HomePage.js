import React, {useState} from 'react'
import {connect} from "react-redux"
import {getVerifiedPosts} from "../redux/actions"
import Post from "../components/layout/Post"
import GoogleMap from './../components/layout/GoogleMap'
import ProfileSlides from './../components/layout/ProfileSlides'

import "./../styles/homePage.css"
import {MenuItem, TextField} from "@material-ui/core";
import Select from "@material-ui/core/Select";

const HomePage = props => {
  const [filterText, changeFilterText] = useState("")
  const [filteredPosts, changeFilteredPosts] = useState([])
  const [category, updateCategory] = useState(null)

  if (!props.posts) props.getVerifiedPosts()

  const filterPosts = (text, categoryName) => {
    changeFilterText(text)
    updateCategory(categoryName)

    const posts = []

    if (categoryName) {
      // find by category
      props.posts?.map(post => post.category === categoryName && posts.push(post))

    } else if (text) {
      // find by tags
      props.posts?.map(post => post.tags.map(tag => tag.includes(text) && posts.push(post)))

    } else if (categoryName && text) {
      // find by category and tag
      console.log('find by category and tag')
      props.posts?.map(post => post.category === categoryName && post.tags.map(tag => tag.includes(text) && posts.push(post)))

    } else {
      // no results
      console.log('no results')
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

      <section className="searchBox">
        <TextField
          id="outlined-basic"
          label="Начниете печатать название"
          style={{width: '50%'}}
          value={filterText}
          onChange={event => filterPosts(event.target.value, category)}
        />

        <Select
          labelId="category-label"
          id="category"
          value={category}
          onChange={event => {
            filterPosts(filterText, event.target.value)
          }}
          displayEmpty
          inputProps={{'aria-label': 'Without label'}}
        >
          <MenuItem value={null}>Без категории</MenuItem>
          <MenuItem value={"Животные"}>Животные</MenuItem>
          <MenuItem value={"Архитектура"}>Архитектура</MenuItem>
          <MenuItem value={"Люди"}>Люди</MenuItem>
          <MenuItem value={"Политика"}>Политика</MenuItem>
        </Select>
      </section>

      <div id="map">
        {props.postLocation && <GoogleMap/>}
        {!filterText && <GoogleMap/>}
        {filterText && <GoogleMap filteredPosts={filteredPosts}/>}
      </div>

      <section id="main-page">
        {(filterText || category) && <div>
          <h4>Результаты</h4>
          <div id="newest-posts">{filteredPosts !== null ? filteredPosts.map(post => <Post post={post}
                                                                                           unverified={false}/>) :
            <p>Ничего не найдено</p>}</div>
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