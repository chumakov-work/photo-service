import React, {useState} from 'react'
import {connect} from "react-redux"
import {getVerifiedPosts} from "../redux/actions"
import Post from "../components/layout/Post"
import GoogleMap from './../components/layout/GoogleMap'
import HomePageSlides from './../components/layout/HomePageSlides'

import "./../styles/homePage.css"
import {MenuItem, Select, TextField} from "@material-ui/core"

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
      props.posts?.map(post => post.category === categoryName && post.tags.map(tag => tag.includes(text) && posts.push(post)))

    } else {
      // no results
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
          <MenuItem value={"Люди"}>Люди</MenuItem>
          <MenuItem value={"Природа"}>Природа</MenuItem>
          <MenuItem value={"Животные"}>Животные</MenuItem>
          <MenuItem value={"Еда"}>Еда</MenuItem>
          <MenuItem value={"Одежда"}>Одежда</MenuItem>
          <MenuItem value={"Эстетика"}>Эстетика</MenuItem>
          <MenuItem value={"Развлечение"}>Развлечение</MenuItem>
          <MenuItem value={"Арт"}>Арт</MenuItem>
          <MenuItem value={"Живопись"}>Живопись</MenuItem>
        </Select>
      </section>

      {/*архитектура
люди
природа
животные
еда
одежда
эстетика
развлечение
арт
живопись*/}

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
          <HomePageSlides posts={props.posts && props.posts} likedPosts={props.posts && props.posts}/>
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