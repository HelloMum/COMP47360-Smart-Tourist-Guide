import React, { useRef, useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];

const Map_Schedule = ({ events }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCY1DTFE2IGNPcc54cRmnnSkLvq8VfpMMo',
    libraries,
  });

  const mapRef = useRef(null);
  const [filteredGeoJson, setFilteredGeoJson] = useState(null);
  const [showGeoJson, setShowGeoJson] = useState(true); // State to control GeoJSON visibility
  const [clickedZone, setClickedZone] = useState(null);

  const containerStyle = {
    width: '100%',
    height: '100vh',
    position: 'relative',
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

  // filter out only manhattan data
  useEffect(() => {
    fetch('/data/NYC_Taxi_Zones.geojson')
      .then(response => response.json())
      .then(data => {
        const filteredData = {
          type: "FeatureCollection",
          features: data.features.filter(feature => feature.properties.borough === "Manhattan"),
        };
        setFilteredGeoJson(filteredData);
      })
      .catch(error => console.error('Error loading GeoJSON data:', error));
  }, []);

  useEffect(() => {
    if (isLoaded && mapRef.current && filteredGeoJson) {
      const map = mapRef.current;

      map.data.forEach((feature) => {
        map.data.remove(feature);
      });

      if (showGeoJson) {
        map.data.addGeoJson(filteredGeoJson);

        map.data.setStyle((feature) => {
          return {
            fillColor: '#FFA07A',
            fillOpacity: 0.4,
            strokeColor: 'white',
            strokeWeight: 1,
          };
        });

        map.data.addListener('click', (event) => {
          const { latLng } = event;
          const zoneName = event.feature.getProperty('zone');

          setClickedZone({
            position: latLng,
            name: zoneName,
          });
        });
      }
    }
  }, [isLoaded, filteredGeoJson, showGeoJson]);

  const getPositionStyle = () => {
    if (!clickedZone || !mapRef.current) return { display: 'none' };

    const map = mapRef.current;
    const scale = Math.pow(2, map.getZoom());
    const projection = map.getProjection();
    const bounds = map.getBounds();

    if (projection && bounds) {
      const nw = projection.fromLatLngToPoint(bounds.getNorthEast());
      const se = projection.fromLatLngToPoint(bounds.getSouthWest());
      const worldPoint = projection.fromLatLngToPoint(clickedZone.position);

      const pos = {
        x: (worldPoint.x - se.x) * scale,
        y: (worldPoint.y - nw.y) * scale,
      };

      return {
        left: `${pos.x}px`,
        top: `${pos.y - 30}px`, // Adjust the position to be above the clicked point
        position: 'absolute',
        background: 'white',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
        zIndex: 10,
      };
    }
    return { display: 'none' };
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  const orangeMarker = {
    path: 'M 0, 0 m -12, 0 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0',
    fillColor: '#ffa500',
    fillOpacity: 1,
    strokeWeight: 0,
    scale: 1.3,
  };

  return (
    <div style={{ position: 'relative' }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={clickedZone ? null : { lat: 40.732, lng: -73.99 }}
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
              fontSize: "18px",
              fontWeight: "normal",
              fontFamily: 'Lexend',
            }}
            icon={orangeMarker}
          />
        ))}
      </GoogleMap>
      {clickedZone && (
        <div id="zone-info" style={getPositionStyle()}>
          <h4>{clickedZone.name}</h4>
        </div>
      )}
      <button
        onClick={() => setShowGeoJson(!showGeoJson)}
        style={{
          position: 'absolute',
          top: 10,
          
          left: '30%',
          transform: 'translateX(-50%)',
          zIndex: 5,
          padding: '5px 10px',
          background: 'orange',
          border: '0px solid #ccc',
          borderRadius: '15px',
          cursor: 'pointer',
          color:'white'
        }}
      >
        Busyness Data
      </button>
    </div>
  );
};

export default Map_Schedule;
