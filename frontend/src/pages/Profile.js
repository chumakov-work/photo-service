import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from "react-redux"
import {Input, Button} from '@material-ui/core';
import {toast} from "react-toastify"

import SearchLocationComponent from "../components/common/SearchLocationComponent"
import {logoutAction, newPostAction} from "../redux/actions"
import Post from './../components/layout/Post'
import './../styles/profile.css'

const Profile = props => {
  const [description, changeDescription] = useState("")
  const [image, changeImage] = useState(null)

  const [location, changeLocation] = useState("")
  const [coords, changeCoords] = useState("")
  // const [chips, changeChips] = useState(null)

  if (!props.user) return <p>loading</p>

  const createPost = event => {
    event.preventDefault()

    if (!image) {
      toast.error("Изображение не загруженно")
      return
    }

    const formData = new FormData()
    formData.append('post', image, image.name)
    props.newPostAction(description, formData, coords)

    changeDescription("")
    changeImage(null)
    changeLocation("")
    changeCoords("")
  }

  if (props.user.isAdmin) return <Redirect to="/admin" />

  return (
    <main id="profilePage">
      <button onClick={props.logoutAction}>Logout</button>

      <form onSubmit={createPost} encType="multipart/form-data">
        <h5>Создать новый пост</h5>

        <div className="form">
          <div className="form-container">
            <h5>Загрузите изображение</h5>
            <Input type="file" name="post" accept=".jpg, .jpeg, .png" className="image-input" onChange={e => changeImage(e.target.files[0])}/>
          </div>

          <div className="form-container desc-container">
            <h5>Добавьте описание</h5>
            <Input value={description} placeholder="Описание" onChange={e => changeDescription(e.target.value)}/>
          </div>

          <div className="form-container search-input">
            <h5>Укажите локацию</h5>
            <SearchLocationComponent
              location={location}
              changeLocation={changeLocation.bind(this)}
              coords={coords}
              changeCoords={changeCoords.bind(this)}
            />
          </div>

          <div className="submitBtn"><Button variant="outlined" color="primary" onClick={createPost}>Создать пост</Button></div>
        </div>
      </form>

      <div className="liked">
        <p className="title">Понравившиеся</p>
        {props.user.liked && props.user.liked.map(post => <Post post={post} fromProfile={true}/>)}
      </div>
    </main>
  )
}

const mapStateToProps = state => {
  return {
    loggedIn: state.user.loggedIn,
    user: state.user.data
  }
}

export default connect(mapStateToProps, {logoutAction, newPostAction})(Profile)