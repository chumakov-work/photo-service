import React from 'react'
import {connect} from "react-redux";

const Post = props => {
  console.log(props.post)

  return (
    <div  style={{marginBottom: '25px'}}>
      <h5>Автор {props.post.author}</h5>
      <h6>{props.post.location.name}</h6>
      <img src={props.post.imagePath} alt="asd" width="250px"/>
      <h6>Описание</h6>
      <p>{props.post.description}</p>
      <button>like</button>
    </div>
  )
}

export default connect(null, null)(Post)