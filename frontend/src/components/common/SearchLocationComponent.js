import React from "react";
import { Input } from '@material-ui/core';
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
          <Input
            {...getInputProps({
              placeholder: 'Локация',
              className: 'location-search-input',
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Загрузка...</div>}
            {suggestions.map(suggestion => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
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