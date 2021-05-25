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

    const containerStyle = {
        width: '60%', 
        height: '500px'
    }

    if (window.innerWidth <= 768) {
        containerStyle.width = '100%'
    }

    return (
        <div style={window.innerWidth <= 768 ? {width: '100%', height: '90%', margin: '0 auto'} : {width: '60%', height: '90%', margin: '0 auto'}}>
            <Map
                scrollwheel={false}
                google={props.google}
                zoom={14}
                styles={[
                    {"elementType": "labels.icon", "stylers": [{
                        "visibility": "off"
                    }]}
                ]}
                streetViewControl={false}
                mapTypeControl={false}
                fullscreenControl={false}
                containerStyle={containerStyle}
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