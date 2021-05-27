import React, {useState} from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react'
// import history from './../common/HistoryComponent'

const PickPlaceGoogleMap = props => {
    const [currentCoords, changeCurrentCoords] = useState({})

    const mapStyles = {
        width: '350px',
        height: '350px'
    }

    const mapClicked = (t, map, coord) => {
        const { latLng } = coord

        const coords = {
            lat: latLng.lat(),
            lng: latLng.lng()
        }

        changeCurrentCoords(coords)

        const geocoder = new window.google.maps.Geocoder()
        geocoder.geocode({location: coords}, (result) => {
            const updatedCoords = {...coords, name: result[0].formatted_address}
            props.changeCoords(updatedCoords)
        })
    }

    return (
        <div>
            <Map
                scrollwheel={false}
                google={props.google}
                style={mapStyles}
                containerStyle={{
                    width: '60%', 
                    height: '500px'
                }}
                zoom={16}
                styles={[
                    {"elementType": "labels.icon", "stylers": [{
                        "visibility": "off"
                    }]}
                ]}
                streetViewControl={false}
                mapTypeControl={false}
                fullscreenControl={false}
                onClick={mapClicked}
                initialCenter={{
                    lat: 55.7305685,
                    lng: 52.38928850000001
                }}
            >
                {currentCoords && <Marker
                    position={currentCoords}    
                />}
            </Map>
        </div>
    )
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDBu_PqciBptn1CwARvl0SEDccnWzgW6bw",
    language: "RU"
})(PickPlaceGoogleMap)