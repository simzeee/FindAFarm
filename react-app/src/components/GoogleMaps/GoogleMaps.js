/* eslint-disable no-undef */
/* global google */
import React from "react";
import GoogleMapReact from 'google-map-react';


export default function GoogleMaps(props){

  console.log(props)

  let locationArray = props.location?.split(" ")

  // console.log(parseFloat(locationArray[1], 10))

  const locater = {
    center: {
      lat: parseFloat(locationArray[1], 10)? parseFloat(locationArray[1], 10) : "",
      lng: parseFloat(locationArray[3], 10)? parseFloat(locationArray[3], 10): ""
    },
    zoom: 14
  };
  const Marker = ({ text }) => <div>{text}</div>;
  
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '50vh', width: '50%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={locater.center}
        defaultZoom={locater.zoom}
      >
        <Marker
          lat={locater.center.lat}
          lng={locater.center.lng}
          text={props.name}
        />
      </GoogleMapReact>
    </div>
  );
}