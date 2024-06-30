import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, Marker, OverlayView, useLoadScript } from '@react-google-maps/api';
import EventCard_PopUp from './EventCard_PopUp';

const Map = ({ events: data,hoveredEventId  }) => {
  
  // useLoadScript hook to load google maps api
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCY1DTFE2IGNPcc54cRmnnSkLvq8VfpMMo',
    libraries: ['places'],
  });

  // keep this line to get rid of the bug: always reposition to center when click a marker
  const [center, setCenter] = useState({ lat: 40.725, lng: -73.99 });

  // all markers
  const [markers, setMarkers] = useState([]);

  // selected marker
  const [selectedMarker, setSelectedMarker] = useState(null);

  // hovered marker
  const [hoveredMarker, setHoveredMarker] = useState(null);

  const mapRef = useRef(null);

  // map container style
  const containerStyle = {
    width: '100%',
    height: '100vh',
    position: 'fixed',
  };

  // map style
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


// get different icon based on category
const getIconUrl = (category) => {
  switch (category) {
    case 'Music':
      return '/images/marker_event/music.png';
    case 'Art & Fashion':
      return '/images/marker_event/art.png';
    case 'Lectures & Books':
      return '/images/marker_event/book.png';
    case 'Food & Festival':
      return '/images/marker_event/food.png';
    case 'Sports & Active':
      return '/images/marker_event/sports.png';
    case 'Kids & Family':
      return '/images/marker_event/kids.png';
    default:
      return '/images/marker_event/other.png';
  }
};


const getHoverIconUrl = (category) => {
  switch (category) {
    case 'Music':
      return '/images/marker_event/music_hover.png';
    case 'Art & Fashion':
      return '/images/marker_event/art_hover.png';
    case 'Lectures & Books':
      return '/images/marker_event/book_hover.png';
    case 'Food & Festival':
      return '/images/marker_event/food_hover.png';
    case 'Sports & Active':
      return '/images/marker_event/sports_hover.png';
    case 'Kids & Family':
      return '/images/marker_event/kids_hover.png';
    default:
      return '/images/marker_event/other_hover.png';
  }
};


  // useEffect to add markers only after the map is loaded
  useEffect(() => {
    if (isLoaded && mapRef.current) {
      const newMarkers = data.map(event => {
        const isEventHovered = hoveredEventId === event.id;
        const isActive = isEventHovered || hoveredMarker === event.id || selectedMarker?.id === event.id;
        const iconSize = isActive ? 45 : 38;  
  
        return (
          <Marker
            key={event.id}
            position={{ lat: event.latitude, lng: event.longitude }}
            title={event.name}
            onClick={() => setSelectedMarker(event)}
            icon={{
              url: isActive ? getHoverIconUrl(event.combined_category) : getIconUrl(event.combined_category),
              scaledSize: new window.google.maps.Size(iconSize, iconSize),
              anchor: new window.google.maps.Point(iconSize / 2, iconSize / 2) 
            }}
            zIndex={isActive ? 1000 : 1}
            onMouseOver={() => setHoveredMarker(event.id)}
            onMouseOut={() => setHoveredMarker(null)}
          />
        );
      });
      setMarkers(newMarkers);
    }
  }, [isLoaded, data, hoveredMarker, hoveredEventId, selectedMarker]);
  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      options={mapOptions}
      onLoad={map => {
        console.log('Map onLoad triggered');
        mapRef.current = map;
      }}
    >
      {markers}

      {/* when select is true, pop up a card */}
      {selectedMarker && (
        <OverlayView
          position={{ lat: selectedMarker.latitude, lng: selectedMarker.longitude }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div style={{
            position: 'absolute',
            transform: 'translate(-50%, -115%)',  //the position of card
            padding: '10px',
            background: 'white',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
            maxWidth: '500px'
          }}>
            <EventCard_PopUp event={selectedMarker} onClose={() => setSelectedMarker(null)} />
          </div>
        </OverlayView>
      )}
    </GoogleMap>
  );
};

export default Map;
