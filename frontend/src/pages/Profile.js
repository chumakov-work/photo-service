import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from "react-redux"
import {Input, Button, Chip} from '@material-ui/core';
import {toast} from "react-toastify"
import { makeStyles } from '@material-ui/core/styles';

import SearchLocationComponent from "../components/common/SearchLocationComponent"
import {newPostAction} from "../redux/actions"
import Post from './../components/layout/Post'
import './../styles/profile.css'
import PickPlaceGoogleMap from './../components/layout/PickPlaceGoogleMap'

const Profile = props => {
  const useStyles = makeStyles({
    chip: {
      marginRight: 5,
      marginTop: 5,
      zIndex: 9999
    },
    input: {
      width: '100%'
    }
  })

  const classes = useStyles()

  const [description, changeDescription] = useState("")
  const [image, changeImage] = useState(null)

  const [location, changeLocation] = useState("")
  const [coords, changeCoords] = useState("")
  const [chips, changeChips] = useState([])
  const [tagName, changeTagName] = useState("")

  if (!props.user) return <p>loading</p>

  const createPost = event => {
    event.preventDefault()

    if (!image) {
      toast.error("Изображение не загруженно")
      return
    }

    const formData = new FormData()
    formData.append('post', image, image.name)
    props.newPostAction(description, formData, coords, chips)

    changeDescription("")
    changeImage(null)
    changeLocation("")
    changeCoords("")
    changeChips([])
    changeTagName("")
  }

  const addTagToPost = event => {
    event.preventDefault()

    if (tagName && chips.length < 10) {
      const updatedChips = chips
      updatedChips.push(tagName)
      changeChips(updatedChips)
      changeTagName("")
    } else {
      toast.error("Максимальное колиество тегов - 10")
    }
  }

  if (props.user.isAdmin) return <Redirect to="/admin" />

  return (
    <main id="profilePage">
      <form onSubmit={createPost} encType="multipart/form-data">
        <h5>Создать новый пост</h5>

        <div className="form">
          <div className="form-container">
              <h6>Загрузите изображение</h6>
              <Input type="file" name="post" accept=".jpg, .jpeg, .png" onChange={e => changeImage(e.target.files[0])}/>
            </div>

            <div className="form-container">
              <h6>Добавьте описание</h6>
              <Input value={description} placeholder="Описание" onChange={e => changeDescription(e.target.value)}/>
            </div>

            <div className="form-container desc-container">
              <h6>Укажите тэги</h6>

              <div className="tags-container">
                <Input value={tagName} placeholder="Текст тэга" onChange={e => changeTagName(e.target.value)}/>
                <input type="submit" value="+" onClick={addTagToPost}/>
              </div>
            </div>
          
          <div className="form-container location-input">
            <h6>Укажите локацию</h6>

            <PickPlaceGoogleMap changeCoords={changeCoords.bind(this)} />
          </div>

          <div className="chip-container">
            <Chip size="small" label="Тэги:" className={classes.chip}/>
            {chips && chips.map(tag => <Chip size="small" label={tag} className={classes.chip}/>)}
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

export default connect(mapStateToProps, {newPostAction})(Profile)