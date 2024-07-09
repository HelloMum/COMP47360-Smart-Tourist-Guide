import React, { useRef, useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];

const Map_Schedule = ({ events, busynessData }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCY1DTFE2IGNPcc54cRmnnSkLvq8VfpMMo',
    libraries,
  });

  const mapRef = useRef(null);
  const [filteredGeoJson, setFilteredGeoJson] = useState(null);
  const [clickedZone, setClickedZone] = useState(null);

  const containerStyle = {
    width: '100%',
    height: '100vh',
    position: 'relative',
  };

  const mapOptions = {
    disableDefaultUI: true,
    styles: [
      // Your map styles here
    ],
    clickableIcons: false,
  };

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

      if (filteredGeoJson) {
        map.data.addGeoJson(filteredGeoJson);

        map.data.setStyle((feature) => {
          const zoneId = feature.getProperty('objectid');
          const busyness = busynessData?.[zoneId]?.[0] || 0;
          const color = getBusynessColor(busyness);

          return {
            fillColor: color,
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
  }, [isLoaded, filteredGeoJson, busynessData]);

  const getBusynessColor = (busyness) => {
    if (busyness <= 2) return 'blue';
    if (busyness <= 4) return 'lightblue';
    if (busyness <= 6) return 'yellow';
    if (busyness <= 8) return 'orange';
    return 'red';
  };

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
        top: `${pos.y - 30}px`,
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
    </div>
  );
};

export default Map_Schedule;
