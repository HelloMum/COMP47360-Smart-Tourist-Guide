import React from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '90vh'
};

const center = {
  lat: 40.783430,
  lng: -73.966250
};

const Map: React.FC = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCY1DTFE2IGNPcc54cRmnnSkLvq8VfpMMo', 
    libraries: ['places'], 
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
    >
      {/* */}
    </GoogleMap>
  );
};

export default Map;
