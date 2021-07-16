/* eslint-disable no-undef */
/* global google */
import React from "react";
import GoogleMapReact from 'google-map-react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
} from '@react-google-maps/api';

import circleFarmer from '../ApiGoogleMap/farmer.png';

const mapStyles = {
  height: '75vh',
  width: '50vw',
};

const libraries = ['places'];



export default function GoogleMaps(props){

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAmBZfHdH2gpZoY_2em_Zfl4DGAq-ZJ38E',
    libraries,
  });

  console.log(props)

  let locationArray = props.location?.split(" ")

  const locater = {
    center: {
      lat: parseFloat(locationArray[1], 10)? parseFloat(locationArray[1], 10) : "",
      lng: parseFloat(locationArray[3], 10)? parseFloat(locationArray[3], 10): ""
    },
    // zoom: 14
  };
  

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Map...';
  
  return (
    
    <GoogleMap mapContainerStyle={mapStyles} zoom={10} center={locater.center}>
      <Marker position={locater.center}
              icon={{
                url: circleFarmer,
                scaledSize: new window.google.maps.Size(30, 30),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
              }}>

      </Marker>
    </GoogleMap>
  );
}