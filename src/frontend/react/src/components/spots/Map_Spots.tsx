import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, Marker, OverlayView, useLoadScript } from '@react-google-maps/api';
import SpotsCard_PopUp from './SpotsCard_PopUp';
import mapOptions from '../../utils/mapStyles'; 
import  googleMapsConfig  from '../../utils/apiConfig'; 

const Map = ({ events, onMarkerClick }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleMapsConfig.googleMapsApiKey,
    libraries: googleMapsConfig.libraries,
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

  useEffect(() => {
    if (isLoaded && events) {
      const newMarkers = events.map(event => {
        const marker = new window.google.maps.Marker({
          position: { lat: event.attraction_latitude, lng: event.attraction_longitude },
          title: event.attraction_name,
          icon: {
            url: getIconUrl(event.category),
            scaledSize: new window.google.maps.Size(38, 38)
          },
          map: mapRef.current
        });

        marker.addListener('mouseover', () => {
          marker.setIcon({
            url: getIconUrl(event.category, true),
            scaledSize: new window.google.maps.Size(48, 48)
          });
        });

        marker.addListener('mouseout', () => {
          marker.setIcon({
            url: getIconUrl(event.category),
            scaledSize: new window.google.maps.Size(38, 38)
          });
        });

        marker.addListener('click', () => {
          setSelectedMarker(event);
          onMarkerClick(event);
        });

        return marker;
      });

      setMarkers(newMarkers);

      return () => {
        newMarkers.forEach(marker => marker.setMap(null));
      };
    }
  }, [isLoaded, events, onMarkerClick]);

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
            maxWidth: '500px'
          }}>
            <SpotsCard_PopUp
              image1={`/images/spots_small/${selectedMarker.index}_1.webp`}
              image3={`/images/spots_small/${selectedMarker.index}_3.webp`}
              title={selectedMarker.attraction_name}
              rating={selectedMarker.attraction_rating}
              category={selectedMarker.category}
              isFree={selectedMarker.isFree}
              user_ratings_total={selectedMarker.user_ratings_total}
              onClose={() => setSelectedMarker(null)}
            />
          </div>
        </OverlayView>
      )}
    </GoogleMap>
  );
};

export default Map;
