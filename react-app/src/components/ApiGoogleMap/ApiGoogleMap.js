import React, { useState, useCallback, useRef } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { formatRelative } from 'date-fns';

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';

import circleFarmer from './farmer.png';
import styles from './ApiGoogleMap.module.css';

const mapContainerStyle = {
  width: '50vw',
  height: '50vh',
};
const libraries = ['places'];

const defaultCenter = {
  lat: 41.4090,
  lng: -75.6624,
};

const options = {
  styles: mapContainerStyle,
  disableDefaultUI: true,
  // zoomControl: true,
};

const MapContainer = () => {
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);

  const onMapClick = useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
    
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAmBZfHdH2gpZoY_2em_Zfl4DGAq-ZJ38E',
    libraries,
  });


  const panTo = useCallback(({lat, lng}) => {
    mapRef.current.panTo({lat, lng});
    mapRef.current.setZoom(14);
  }, [])


  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  return (
    <>
      <Search panTo={panTo}/>
      <GoogleMap
        zoom={8}
        center={defaultCenter}
        mapContainerStyle={mapContainerStyle}
        onClick={onMapClick}
        //You are given the lat/lng on click
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: circleFarmer,
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>A farm</h2>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </>
  );
};


// funciton Locate({panTo}) {
//   return <button><img src=""></img></button>
// }

function Search({panTo}) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.653225, lng: () => -79.383186 },
      radius: 200 * 1000,
    },
  });

  return (
    <div className={styles.comboBox}>
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions()

          try {
            const results = await getGeocode({ address });
            const {lat, lng} = await getLatLng(results[0]);
            panTo({lat, lng})
          } catch (error) {
            console.log('error');
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Enter an address"
        />
        <ComboboxPopover>
          <ComboboxList>
          {status === 'OK' &&

            data.map(({ id, description }) => (
              <ComboboxOption key={Math.random()} value={description}></ComboboxOption>
            ))}

          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

export default MapContainer;
