import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleMap, Marker, OverlayView, useLoadScript } from '@react-google-maps/api';
import SpotsCard_PopUp from './SpotsCard_PopUp';
import mapOptions from '../../utils/mapStyles';
import googleMapsConfig from '../../utils/apiConfig';

const Map_Spots = ({ events, onMarkerClick, activeSpot, popupSpot, onPopupClose, hoveredSpot }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleMapsConfig.googleMapsApiKey,
    libraries: googleMapsConfig.libraries,
  });

  const [center, setCenter] = useState({ lat: 40.725, lng: -73.99 });
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const mapRef = useRef(null);

  const containerStyle = {
    width: '100%',
    height: '100vh',
    position: 'fixed',
  };

  const getIconUrl = (category, isActive = false) => {
    const folder = isActive ? 'marker_spots_active' : 'marker_spots';
    switch (category) {
      case 'natural':
        return `/images/${folder}/nature.png`;
      case 'cultural':
        return `/images/${folder}/culture.png`;
      case 'arts':
        return `/images/${folder}/art.png`;
      case 'religious':
        return `/images/${folder}/religious.png`;
      case 'shopping and dining':
        return `/images/${folder}/shopping.png`;
      case 'entertainment':
        return `/images/${folder}/entertainment.png`;
      case 'landmark':
        return `/images/${folder}/landmark.png`;
      default:
        return `/images/${folder}/other.png`;
    }
  };

  const handleMarkerClick = useCallback((event) => {
    setSelectedMarker(event);
    onMarkerClick(event);
  }, [onMarkerClick]);

  useEffect(() => {
    if (popupSpot === null) {
      setSelectedMarker(null);
    }
  }, [popupSpot]);

  const handleMouseOver = (event) => {
    setHoveredMarker(event);
  };

  const handleMouseOut = () => {
    setHoveredMarker(null);
  };

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
      {events.map(event => {
        const isActive = activeSpot?.index === event.index || hoveredSpot?.index === event.index || selectedMarker?.index === event.index || hoveredMarker?.index === event.index;
        const iconUrl = getIconUrl(event.category, isActive);
        const iconSize = isActive ? 45 : 38;
        return (
          <Marker
            key={event.index}
            position={{ lat: event.attraction_latitude, lng: event.attraction_longitude }}
            title={event.attraction_name}
            icon={{
              url: iconUrl,
              scaledSize: new window.google.maps.Size(iconSize, iconSize),
              anchor: new window.google.maps.Point(iconSize / 2, iconSize / 2),
            }}
            zIndex={isActive ? 999 : 1}
            onMouseOver={() => handleMouseOver(event)}
            onMouseOut={handleMouseOut}
            onClick={() => handleMarkerClick(event)}
          />
        );
      })}

      {selectedMarker && (
        <OverlayView
          position={{ lat: selectedMarker.attraction_latitude, lng: selectedMarker.attraction_longitude }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div style={{
            position: 'absolute',
            transform: 'translate(-50%, -115%)',
            background: 'white',
            border: '1px solid #ddd',
            borderRadius: '8px',
            maxWidth: '500px',
          }}>
            <SpotsCard_PopUp
              id={selectedMarker.index}
              image1={`/images/spots_small/${selectedMarker.index}_1.webp`}
              image3={`/images/spots_small/${selectedMarker.index}_3.webp`}
              title={selectedMarker.attraction_name}
              rating={selectedMarker.attraction_rating}
              category={selectedMarker.category}
              isFree={selectedMarker.free}
              user_ratings_total={selectedMarker.user_ratings_total}
              onClose={() => {
                setSelectedMarker(null);
                onPopupClose();
              }}
            />
          </div>
        </OverlayView>
      )}
    </GoogleMap>
  );
};

export default Map_Spots;
