import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, Marker, OverlayView, useLoadScript } from '@react-google-maps/api';
import EventCard_PopUp from '../events/EventCard_PopUp';
import SpotsCard_PopUp from './SpotsCard_PopUp';

const Map = ({ events }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCY1DTFE2IGNPcc54cRmnnSkLvq8VfpMMo',
    libraries: ['places'],
  });

  const [center, setCenter] = useState({ lat: 40.725, lng: -73.99 });
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
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
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [{ color: '#abdff0' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [{ color: '#f7f6f6' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#dddddd' }]
      },
      {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#999999' }]
      },
      {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#ffffff' }]
      },
      {
        featureType: 'road.local',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'road',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [{ color: '#f8f4f1' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#f2efff' }]
      },
    ],
  };

  const getIconUrl = (category) => {
    switch (category) {

      case 'natural':
          return '/images/marker_spots/nature.png';
      case 'cultural':
          return '/images/marker_spots/culture.png';
        case 'arts':
          return '/images/marker_spots/art.png';
      case 'religious':
        return '/images/marker_spots/religious.png';
      case 'shopping and dining':
        return '/images/marker_spots/shopping.png';
      case 'entertainment':
        return '/images/marker_spots/entertainment.png';
      case 'landmark':
        return '/images/marker_spots/landmark.png';
      default:
        return '/images/marker_spots/other.png';
    }
  };

  useEffect(() => {
    if (isLoaded && events) {
      const newMarkers = events.map(event => (
        <Marker
          key={event.id}
          position={{ lat: event.attraction_latitude, lng: event.attraction_longitude }}
          title={event.attraction_name}
          onClick={() => setSelectedMarker(event)}
          icon={{
            url: getIconUrl(event.category),
            scaledSize: new window.google.maps.Size(38, 38)
          }}
        />
      ));
      setMarkers(newMarkers);
    }
  }, [isLoaded, events]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      options={mapOptions}
      onLoad={map => {
        mapRef.current = map;
      }}
    >
      {markers}

      {selectedMarker && (
        <OverlayView
          position={{ lat: selectedMarker.attraction_latitude, lng: selectedMarker.attraction_longitude }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div style={{
            position: 'absolute',
            transform: 'translate(-50%, -130%)',
            padding: '10px',
            background: 'white',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
            maxWidth: '500px'
          }}>
            <SpotsCard_PopUp event={selectedMarker} onClose={() => setSelectedMarker(null)} />
          </div>
        </OverlayView>
      )}
    </GoogleMap>
  );
};

export default Map;
