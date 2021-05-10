import React from "react";
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'

const SearchLocationComponent = props => {
  const decodeLocation = async nameOfLocation => {
    props.changeLocation(nameOfLocation)

    const coords = await geocodeByAddress(nameOfLocation)
      .then(results => getLatLng(results[0]))
      .then(({lat, lng}) => {
        return {name: nameOfLocation, lat, lng}
      })

    props.changeCoords(coords)
  }

  return (
    <PlacesAutocomplete
      value={props.location}
      onChange={props.changeLocation}
      onSelect={decodeLocation}
    >
      {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
        <div>
          <input
            {...getInputProps({
              placeholder: 'Search Places ...',
              className: 'location-search-input',
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              // inline style for demonstration purpose
              const style = suggestion.active
                ? {backgroundColor: '#fafafa', cursor: 'pointer'}
                : {backgroundColor: '#ffffff', cursor: 'pointer'};
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  )
}

export default SearchLocationComponent