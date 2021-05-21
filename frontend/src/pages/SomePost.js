import React, { useEffect, useState } from 'react'
import {useParams, Link} from 'react-router-dom'
import {getSinglePost, likePost} from './../redux/actions'
import {connect} from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import {Button, Chip} from "@material-ui/core"

const useStyles = makeStyles({
    root: {
      maxWidth: 390,
      marginBottom: 25
    },
    media: {
      height: 140,
    },
    button: {
      marginTop: 10,
      marginRight: 15
    },
    chip: {
      marginRight: 5
    }
  });
const SomePost = props => {
    const classes = useStyles()
    let { id } = useParams()
    const [liked, changeLiked] = useState(false)

    useEffect(() => {
        if (id) props.getSinglePost(id)

        if (props.userData && props.post && props.post.likedBy) {
          changeLiked(props.post.likedBy.filter(user => user === props.userData.login).length > 0)
        }
      }, [props, props.userData, props.post, id])

    const likeSomePost = () => {
        props.likePost(props.posts, props.post._id)
      }

    if (!props.post) return <p>Загрузка...</p>
    return (
        <main id="somePost">
          <Link to="/" className="backLink">Назад</Link>

          <div id="singlePostPage">
            <img src={props.post.imagePath} width="350px" alt={props.post.imagePath}/>
              <p>Автор: {props.post.author}</p>
              <p>{props.post.description ? `Описание: ${props.post.description}` : 'Нет описания'}</p>

              {props.loggedIn && !props.fromProfile && !props.unverified && <div>
              <p>Понравилось <b>{props.post.likes}</b></p>
              
              <div className="likesButton">
              {liked ? 
                <Button variant="contained" color="secondary" disabled className={classes.button}>
                  Нравится
                </Button> : 
                <Button variant="contained" color="secondary" onClick={likeSomePost} className={classes.button}>
                  Нравится
                </Button>
              }
              </div>
            </div>}

            <div style={{marginTop: '10px'}}>{props.post && props.post.tags && props.post.tags.map(tag => <Chip size="small" label={tag} className={classes.chip}/>)}</div>
          </div>
        </main>
    )
}

const mapStateToProps = state => {
    return {
        post: state.singlePost,
        loggedIn: state.user.loggedIn,
        userData: state.user.data,
        posts: state.posts,
        unverifiedPosts: state.unverifiedPosts
    }
}

export default connect(mapStateToProps, {getSinglePost, likePost})(SomePost)