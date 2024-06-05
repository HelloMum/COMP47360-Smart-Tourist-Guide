import React from 'react';
import { GoogleMap } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '90vh'
};

const center = {
  lat: 40.783430,
  lng: -73.966250
};

const Map: React.FC = () => {
  return (
    <div>
      <h1>Map</h1>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
        { /* You can add more components here */ }
      </GoogleMap>
    </div>
  );
};

export default Map;
