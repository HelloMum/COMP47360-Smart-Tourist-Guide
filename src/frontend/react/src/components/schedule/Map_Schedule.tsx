import React, { useRef } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const Map_Schedule = ({ events }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCY1DTFE2IGNPcc54cRmnnSkLvq8VfpMMo', 
    libraries: ['places'],
  });

  const mapRef = useRef(null);

  const containerStyle = {
    width: '100%',
    height: '100vh',
    position: 'fixed',
  };

  const mapOptions = {
    disableDefaultUI: true,
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [{ color: '#abdff0' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [{ color: '#f7f6f6' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#dddddd' }],
      },
      {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#999999' }],
      },
      {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#ffffff' }],
      },
      {
        featureType: 'transit.station',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d5baaa' }, { lightness: 30 }],
      },
      {
        featureType: 'road',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#ffffff' }, { weight: 2 }],
      },
      {
        featureType: 'landscape.man_made',
        elementType: 'geometry',
        stylers: [{ color: '#f8f4f1' }],
      },
      {
        featureType: 'landscape.natural',
        elementType: 'geometry',
        stylers: [{ color: '#dcf2cd' }],
      },
      {
        featureType: 'landscape.natural.landcover',
        elementType: 'geometry',
        stylers: [{ color: '#dcf2cd' }],
      },
      {
        featureType: 'landscape.natural.terrain',
        elementType: 'geometry',
        stylers: [{ color: '#dcf2cd' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#f2efff' }],
      },
      {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'poi.government',
        elementType: 'geometry.fill',
        stylers: [{ color: '#fae6db' }],
      },
      {
        featureType: 'poi.medical',
        elementType: 'geometry.fill',
        stylers: [{ color: '#fae6db' }],
      },
      {
        featureType: 'poi.school',
        elementType: 'geometry.fill',
        stylers: [{ color: '#fae6db' }],
      },
      {
        featureType: 'poi.sports_complex',
        elementType: 'geometry.fill',
        stylers: [{ color: '#fae6db' }],
      },
      {
        featureType: 'poi.business',
        elementType: 'geometry.fill',
        stylers: [{ color: '#d6ecc7' }],
      },
      {
        featureType: 'poi.business',
        elementType: 'geometry.stroke',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry.fill',
        stylers: [{ color: '#dcf2cd' }],
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry.stroke',
        stylers: [{ visibility: 'off' }],
      },
    ],
    clickableIcons: false,
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  const orangeMarker = {
    path: 'M 0, 0 m -12, 0 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0', 
    fillColor: '#ffa500',
    fillOpacity: 1,
    strokeWeight: 0,
    // strokeColor: '#d4831f',
    // strokeOpacity: 0.4,
    scale: 1.4,
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: 40.732, lng: -73.99 }}
      zoom={12.5}
      options={mapOptions}
      onLoad={(map) => {
        mapRef.current = map;
      }}
    >
      {events.map((event, index) => (
        <Marker
          key={event.id}
          position={{ lat: event.latitude, lng: event.longitude }}
          title={event.name}
          label={{
            text: `${index + 1}`,
              color: "white",
            // color: "#b66501",
            // color:"darkorange",
            fontSize: "18px",
            fontWeight: "normal",
            fontFamily: 'Lexend', 
          }}
          icon={orangeMarker}
        />
      ))}
    </GoogleMap>
  );
};

export default Map_Schedule;
