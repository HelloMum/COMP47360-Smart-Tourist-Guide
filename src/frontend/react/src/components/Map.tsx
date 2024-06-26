import React, { useState } from 'react';
import { GoogleMap, Marker, OverlayView, useLoadScript } from '@react-google-maps/api';
import EventCard_PopUp from '../components/EventCard_PopUp';  

const Map = ({ events }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCY1DTFE2IGNPcc54cRmnnSkLvq8VfpMMo',
    libraries: ['places'],
  });

  const [selectedEvent, setSelectedEvent] = useState(null);

  const containerStyle = {
    width: '100%',
    height: '100vh',
    position: 'fixed',
  };

  const center = {
    lat: 40.725,
    lng: -73.99
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

  const onMarkerClick = (event) => {
    setSelectedEvent(event);
  };

  const handleClose = () => {
    setSelectedEvent(null);
  };


  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      options={mapOptions}
    >
      {events.map(event => (
        <Marker
          key={event.id}
          position={{ lat: event.latitude, lng: event.longitude }}
          title={event.name}
          onClick={() => onMarkerClick(event)}
          icon={{
            url: '/images/marker/icon.png',
            scaledSize: new window.google.maps.Size(30, 41)
          }}
        />
      ))}
    {selectedEvent && (
  <OverlayView
    position={{ lat: selectedEvent.latitude, lng: selectedEvent.longitude }}
    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
  >
    <div style={{
      position: 'absolute', 
      transform: 'translate(-50%, -135%)', 
      padding: '10px',
      background: 'white',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
      maxWidth: '500px' 
    }}>
      <EventCard_PopUp event={selectedEvent} onClose={handleClose}/>
    </div>
  </OverlayView>
)}

    </GoogleMap>
  );
};

export default Map;
