import React, {useState} from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react'
import history from './../common/HistoryComponent'
import {connect} from 'react-redux'

const GoogleMap = props => {
    const [center, updateCenter] = useState(null)

    const changeMapCenter = (mapProps, map) => {
        updateCenter({
            lat: map.center.lat(),
            lng: map.center.lng()
        })
    }

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
            {props.filteredPosts ? <Map
                google={props.google}
                onDragend={changeMapCenter}
                
                zoom={14}
                scrollwheel={false}
                streetViewControl={false}
                mapTypeControl={false}
                fullscreenControl={false}

                containerStyle={containerStyle}
                styles={[
                    {"elementType": "labels.icon", "stylers": [{
                        "visibility": "off"
                    }]}
                ]}

                initialCenter={props.center ? props.center : {
                    lat: 55.7305685,
                    lng: 52.38928850000001
                }}
                center={props.center ? props.center : center}
            >
                {props.filteredPosts && props.filteredPosts.map(point => <Marker
                    position={{lat: point.location.lat, lng: point.location.lng}}
                    onClick={() => history.push(`/post/${point._id}`)}
                />)}
            </Map> : <Map
                google={props.google}
                onDragend={changeMapCenter}
                
                zoom={14}
                streetViewControl={false}
                mapTypeControl={false}
                fullscreenControl={false}
                scrollwheel={false}

                containerStyle={containerStyle}
                styles={[
                    {"elementType": "labels.icon", "stylers": [{
                        "visibility": "off"
                    }]}
                ]}

                initialCenter={props.center ? props.center : {
                    lat: 55.7305685,
                    lng: 52.38928850000001
                }}
                center={props.center ? props.center : center}
            >
                {props.posts && points && points.map(point => <Marker
                    position={point.position}
                    onClick={() => history.push(`/post/${point.post._id}`)}
                />)}
            </Map>}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        posts: state.posts,
        center: state.postLocation
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDBu_PqciBptn1CwARvl0SEDccnWzgW6bw"
})(connect(mapStateToProps, null)(GoogleMap))