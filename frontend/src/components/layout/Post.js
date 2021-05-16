import React, {useEffect, useState} from 'react'
import {connect} from "react-redux"
import {likePost, verifyPost, deletePost} from "../../redux/actions"

const Post = props => {
  const [liked, changeLiked] = useState(false)

  useEffect(() => {
    if (props.userData && props.post && props.post.likedBy) {
      changeLiked(props.post.likedBy.filter(user => user === props.userData.login).length > 0)
    }
  }, [props.userData, props.post])

  const likeSomePost = () => {
    props.likePost(props.posts, props.post._id)
  }

  const verifyPost = () => {
    props.verifyPost(props.unverifiedPosts, props.post._id)
  }

  const deletePost = () => {
    props.deletePost(props.unverifiedPosts, props.post._id)
  }

  return (
    <div  style={{marginBottom: '25px'}}>
      <h5>Автор {props.post.author}</h5>
      <h6>{props.post.location.name}</h6>
      <img src={props.post.imagePath} alt="asd" width="250px"/>
      <h6>Описание</h6>
      <p>{props.post.description.length > 0 ? props.post.description : "Описание отсутствует"}</p>

      {props.loggedIn && !props.fromProfile && !props.unverified && <div>
        <p>{props.post.likes}</p>
        {liked ? <button onClick={likeSomePost} disabled={true}>Нравится</button> : <button onClick={likeSomePost}>Нравится</button>}
      </div>}

      {props.loggedIn && !props.fromProfile && props.unverified && <div>
        <button onClick={verifyPost}>Одобрить</button>
        <button onClick={deletePost}>Удалить</button>
      </div>}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    loggedIn: state.user.loggedIn,
    userData: state.user.data,
    posts: state.posts,
    unverifiedPosts: state.unverifiedPosts
  }
}

export default connect(mapStateToProps, {likePost, verifyPost, deletePost})(Post)