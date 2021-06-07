import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from "react-redux"
import {Input, Button, Chip, MenuItem} from '@material-ui/core';
import {toast} from "react-toastify"
import {makeStyles} from '@material-ui/core/styles';

import {newPostAction, someUserAction} from "../redux/actions"
import Select from '@material-ui/core/Select';
import './../styles/profile.css'
import PickPlaceGoogleMap from './../components/layout/PickPlaceGoogleMap'
import ProfileSlides from './../components/layout/ProfileSlides'

const Profile = props => {
  const useStyles = makeStyles({
    chip: {
      marginRight: 5,
      marginTop: 5,
      zIndex: 9999
    },
    input: {
      width: 300
    }
  })

  const classes = useStyles()

  const [description, changeDescription] = useState("")
  const [image, changeImage] = useState(null)

  const [coords, changeCoords] = useState("")
  const [chips, changeChips] = useState([])
  const [tagName, changeTagName] = useState("")
  const [category, updateCategory] = useState("")

  if (!props.user) return <p>loading</p>

  const createPost = event => {
    event.preventDefault()

    if (!image) {
      toast.error("Изображение не загруженно")
      return
    }

    const formData = new FormData()
    formData.append('post', image, image.name)
    props.newPostAction(description, formData, coords, chips, category)

    changeDescription("")
    changeImage(null)
    changeCoords("")
    changeChips([])
    changeTagName("")
    updateCategory("")
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

  if (props.user.isAdmin) return <Redirect to="/admin"/>

  return (
    <main id="profilePage">
      <form onSubmit={createPost} encType="multipart/form-data">
        <h5 style={{textAlign: 'center'}}>Создать новый пост</h5>

        <div className="form" style={{display: 'flex', justifyContent: "center"}}>
          <div>
            <div className="form-container">
              <h6>Загрузите изображение</h6>
              <Input type="file" name="post" accept=".jpg, .jpeg, .png" className={classes.input}
                     onChange={e => changeImage(e.target.files[0])}/>
            </div>

            <div className="form-container">
              <h6>Добавьте описание</h6>
              <Input value={description} className={classes.input} placeholder="Описание"
                     onChange={e => changeDescription(e.target.value)}/>
            </div>

            <div className="chip-container">
              <Chip size="small" label="Тэги:" className={classes.chip}/>
              {chips && chips.map(tag => <Chip size="small" label={tag} className={classes.chip}/>)}
            </div>

            <div className="form-container desc-container">
              <h6>Укажите тэги</h6>

              <div className="tags-container">
                <Input value={tagName} className={classes.input} placeholder="Текст тэга"
                       onChange={e => changeTagName(e.target.value)}/>
                <input type="submit" value="+" className="tagSubmitBtn" onClick={addTagToPost}/>
              </div>
            </div>

            <div className="form-container desc-container">
              <h6>Выберите категорию</h6>

              <Select
                labelId="category-label"
                id="category"
                value={category}
                onChange={e => updateCategory(e.target.value)}
                displayEmpty
                inputProps={{'aria-label': 'Without label'}}
              >
                <MenuItem value="" disabled>Категория</MenuItem>
                <MenuItem value={"Животные"}>Животные</MenuItem>
                <MenuItem value={"Архитектура"}>Архитектура</MenuItem>
                <MenuItem value={"Люди"}>Люди</MenuItem>
                <MenuItem value={"Природа"}>Политика</MenuItem>
              </Select>
            </div>
          </div>

          <div className="form-container location-input" style={{marginLeft: '50px'}}>
            <h6>Укажите локацию</h6>
            <PickPlaceGoogleMap changeCoords={changeCoords.bind(this)}/>
          </div>
        </div>

        <div className="submitBtn"><Button variant="outlined" color="primary" onClick={createPost}>Создать пост</Button>
        </div>
      </form>

      <ProfileSlides myPosts={props.user.posts && props.user.posts.length > 0 && props.user.posts}
                     likedPosts={props.user.liked && props.user.liked}/>

    </main>
  )
}

const mapStateToProps = state => {
  return {
    loggedIn: state.user.loggedIn,
    user: state.user.data,
    userPosts: state.someUser
  }
}

export default connect(mapStateToProps, {newPostAction, someUserAction})(Profile)