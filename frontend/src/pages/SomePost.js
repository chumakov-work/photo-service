import React, {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import {getSinglePost, likePost, getVerifiedPosts} from './../redux/actions'
import {connect} from 'react-redux'

import {makeStyles} from '@material-ui/core/styles'
import {Card, CardContent, CardHeader, CardMedia, Button} from "@material-ui/core"
import Post from "../components/layout/Post";

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
  let {id} = useParams()
  const [liked, changeLiked] = useState(false)
  const [nearbyPosts, updateNearbyPosts] = useState(false)

  useEffect(() => {
    if (id && !props.post) props.getSinglePost(id)
    if (!props.posts) props.getVerifiedPosts()

    if (props.userData && props.post && props.post.likedBy) {
      changeLiked(props.post.likedBy.filter(user => user === props.userData.login).length > 0)
    }
  }, [props, props.userData, props.post, id])

  const likeSomePost = () => {
    props.likePost(props.posts, props.post._id)
  }

  if (!nearbyPosts) {
    const nearbyPostsCopy = []

    props.posts?.map(post => {
      const somePostCoords = post.location
      const currentPostCoords = props.post?.location
      const zoomRatio = 0.05

      if (somePostCoords?.lat !== currentPostCoords?.lat && somePostCoords?.lng !== currentPostCoords?.lng) {
        const lat1 = somePostCoords?.lat - zoomRatio < currentPostCoords?.lat
        const lng1 = somePostCoords?.lng - zoomRatio < currentPostCoords?.lng

        const lat2 = somePostCoords?.lat + zoomRatio > currentPostCoords?.lat
        const lng2 = somePostCoords?.lng + zoomRatio > currentPostCoords?.lng

        if (lat1 && lat2 && lng1 && lng2) {
          nearbyPostsCopy.push(post)
        }
      }
    })

    if (nearbyPostsCopy.length > 0) {
      updateNearbyPosts(nearbyPostsCopy)
    }
  }

  const classes = useStyles()

  if (!props.post) return <p>Загрузка...</p>
  return (
    <main id="somePost">
      <Link to="/" className="backLink" style={{marginTop: '50px'}}>Назад</Link>

      <div id="singlePostPage" style={{maxWidth: '450px', margin: '10% auto'}}>
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

      <div>
        <h4 style={{textAlign: 'center'}}>Также рядом с этим</h4>

        <div style={{display: 'flex', flexWrap: 'wrap', width: '90%', margin: '0 auto'}}>
          {nearbyPosts && nearbyPosts.map(post => <Post post={post} />)}
        </div>
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

export default connect(mapStateToProps, {getSinglePost, likePost, getVerifiedPosts})(SomePost)