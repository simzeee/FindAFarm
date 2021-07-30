import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { getAllFarms } from '../../store/farms';

import circleFarmer from '../ApiGoogleMap/farmer.png';
import styles from './AllFarmsMap.module.css';

const defaultCenter = {
  lat: 37.6872,
  lng: -97.3301,
};

const mapStyles = {
  height: '70vh',
  width: '70vw',
};

const libraries = ['places'];

const SetLocation = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const farms = useSelector((state) => state.farms);
  const [selected, setSelected] = useState(null);

  const locationsArray = Object.values(farms)?.map((farm) => {
    return [farm.location, farm.name, farm.id];
  });

  const makeLocationsArray = (initialArray) => {
    const resultArray = [];
    initialArray.forEach((location) => {
      const locationObject = {};

      let splitLocation = location[0].split(' ');

      locationObject.location = {
        lat: parseFloat(splitLocation[1], 10),
        lng: parseFloat(splitLocation[3], 10),
      };

      locationObject.name = location[1];

      locationObject.id = location[2];

      resultArray.push(locationObject);
    });

    return resultArray;
  };

  const [locations, setLocations] = useState(
    makeLocationsArray(locationsArray)
  );

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAmBZfHdH2gpZoY_2em_Zfl4DGAq-ZJ38E',
    libraries,
  });

  const testFunction = (id) => {
    window.scrollTo(0, 0);
    history.push(`/farms/${id}`);
  };

  useEffect(() => {
    dispatch(getAllFarms());
    setLocations(makeLocationsArray(locationsArray));
  }, [locationsArray.length]);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Map...';

  return (
    <div>
      <GoogleMap mapContainerStyle={mapStyles} zoom={4} center={defaultCenter}>
        {locations?.map((marker) => {
          return (
            <Marker
              key={marker.id}
              position={marker.location}
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
          );
        })}

        {selected ? (
          <InfoWindow
            position={{
              lat: selected.location.lat,
              lng: selected.location.lng,
            }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div
              className={styles.infoBox}
              onClick={() => testFunction(selected.id)}
            >
              <h4>{selected.name}</h4>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
};

export default SetLocation;
