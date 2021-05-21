import React from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react'
import history from './../common/HistoryComponent'
import {connect} from 'react-redux'

const GoogleMap = props => {
    const points = []
    if (props.posts) {
        props.posts.map(post => post.location && points.push({
            position: {lat: post.location.lat, lng: post.location.lng},
            post
        }))
    } 

    return (
        <div>
            <Map
                scrollwheel={false}
                google={props.google}
                zoom={16}
                containerStyle={{width: '60%', height: '90%', position: 'absolute'}}
                initialCenter={{
                    lat: 55.7305685,
                    lng: 52.38928850000001
                }}
            >
                {props.posts && points && points.map(point => <Marker
                    position={point.position}
                    onClick={() => history.push(`/post/${point.post._id}`)}
                />)}
            </Map>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        posts: state.posts
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDBu_PqciBptn1CwARvl0SEDccnWzgW6bw"
})(connect(mapStateToProps, null)(GoogleMap))