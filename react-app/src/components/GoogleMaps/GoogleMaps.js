/* eslint-disable no-undef */
/* global google */
import React from "react";
import GoogleMapReact from 'google-map-react';

const Marker = ({ text }) => <div>{text}</div>;

export default function SimpleMap(){
  const defaultProps = {
    center: {
      lat: 41.4090,
      lng: -75.6624
    },
    zoom: 14
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '50vh', width: '50%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Marker
          lat={41.4090}
          lng={-75.6624}
          text="SCRANTON"
        />
      </GoogleMapReact>
    </div>
  );
}