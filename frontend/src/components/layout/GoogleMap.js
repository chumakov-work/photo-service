import React from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react'

const GoogleMap = props => {
    const markers = []
    const bounds = new props.google.maps.LatLngBounds()
    for (let i = 0; i < markers.length; i++) {
        bounds.extend(markers[i])
    }

    const mapStyles = {
        width: '60%',
        height: '90%'
    }

    const points = []
    if (props.posts) {
        props.posts.map(post => post.location && points.push({
            image: new props.google.maps.MarkerImage(
                post.imagePath,
                null,
                null,
                null,
                new window.google.maps.Size(32, 32)
            ),
            position: {lat: post.location.lat, lng: post.location.lng}
        }))
    }

    // let startCoordinates = {}

    // if (props.userPosition && props.userPosition.location) {
    //     startCoordinates = {
    //         lat: props.userPosition.location.lat,
    //         lng: props.userPosition.location.lon
    //     }
    // } else {
    //     startCoordinates = {
    //         lat: 55.7415916,
    //         lng: 52.42225
    //     }
    // }

    return (
        <div>
            <Map
                scrollwheel={false}
                google={props.google}
                style={mapStyles}
                zoom={16}
                bounds={bounds}
                initialCenter={{
                    lat: 55.7305685,
                    lng: 52.38928850000001
                }}
            >
                {props.posts && points && points.map(point => <Marker 
                    icon={point.image}
                    position={point.position}
                />)}
            </Map>
        </div>
    )
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDBu_PqciBptn1CwARvl0SEDccnWzgW6bw"
})(GoogleMap)