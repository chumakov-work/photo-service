import React, {useEffect, useState} from 'react'
import {connect} from "react-redux"
import {Link} from 'react-router-dom'
import {likePost, verifyPost, deletePost, locateThePost} from "../../redux/actions"
import { makeStyles } from '@material-ui/core/styles'
import {Card, CardContent, CardHeader, CardMedia, Button, Chip, Typography} from "@material-ui/core"
import DeleteIcon from '@material-ui/icons/Delete'
import SaveIcon from '@material-ui/icons/Save'

const useStyles = makeStyles({
  root: {
    width: 300,
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

  const classes = useStyles()

  if (!props.post) return ""

  return (
    <div style={{margin: '5px'}}>
      <Card className={classes.root} variant="outlined">
        <CardHeader
          title={`Автор ${props.post.author}`}
        />

        <CardContent>
          <Link to={`/post/${props.post._id}`}>
            <CardMedia
              className={classes.media}
              image={props.post.imagePath}
              title={props.post.author}
            />
          </Link>
        </CardContent>

        <CardContent>
          {props.post && props.post.description && props.post.description.length > 0 ? `Описание: ${props.post.description}` : "Описание отсутствует"}
        </CardContent>

        <CardContent>
          {props.post && props.post.tags && props.post.tags.map(tag => <Chip size="small" label={tag} className={classes.chip}/>)}
          <p>Понравилось <b>{props.post?.likes}</b> людям</p>
          {props.loggedIn && !props.fromProfile && !props.unverified && <div>
            <div className="likesButton">
            {liked ? 
              <Button variant="contained" color="primary" disabled className={classes.button}>
                <Typography>Нравится</Typography>
              </Button> : 
              <Button variant="contained" color="primary" onClick={likeSomePost} className={classes.button}>
                <Typography>Нравится</Typography>
              </Button>
            }

              <Button variant="contained" color="primary" onClick={() => props.locateThePost({lat: props.post.location.lat, lng: props.post.location.lng})} className={classes.button}>
                <Typography>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M18.364 17.364L12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="#fff"/></svg>
                </Typography>
              </Button>
            </div>
          </div>}

          {props.loggedIn && !props.fromProfile && props.unverified && <div>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={verifyPost}
              startIcon={<SaveIcon />}
            >
              Одобрить
            </Button>
                
            <Button
              variant="contained"
              color="secondary"
              onClick={deletePost}
              className={classes.button}
              startIcon={<DeleteIcon />}
            >
              Удалить
            </Button>
          </div>}
        </CardContent>
      </Card>
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

export default connect(mapStateToProps, {likePost, verifyPost, deletePost, locateThePost})(Post)