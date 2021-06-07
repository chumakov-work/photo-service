import React, { useEffect, useState } from 'react'
import {useParams, Link} from 'react-router-dom'
import {getSinglePost, likePost} from './../redux/actions'
import {connect} from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import {Card, CardContent, CardHeader, CardMedia, Button} from "@material-ui/core"

const useStyles = makeStyles({
  root: {
    width: 350,
    marginBottom: 25
  },
  media: {
    height: 360,
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

    const classes = useStyles()

    if (!props.post) return <p>Загрузка...</p>
    return (
        <main id="somePost" style={{maxWidth: '450px', margin: '0 auto'}}>
          <Link to="/" className="backLink">Назад</Link>

          <div id="singlePostPage" style={{width: '80%', margin: '10% auto'}}>
            <Card>
              <CardHeader title={<Link to={`/user/${props.post.author}`}>{props.post.author}</Link>}/>

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
              </CardContent>

              <CardContent>
                <p>{props.post.description ? `Описание: ${props.post.description}` : 'Нет описания'}</p>
              </CardContent>

            </Card>
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