import React, { useRef, useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import moment from 'moment';
import ScheduleCard_Popup from './ScheduleCard_PopUp';
import Legend from './Legend';
import mapOptions from '../../utils/mapStyles'; 
import  googleMapsConfig  from '../../utils/apiConfig'; 


interface MapScheduleProps {
  events: any[];
  busynessData: any;
  selectedTime: string | null;
}

const Map_Schedule: React.FC<MapScheduleProps> = ({ events, busynessData, selectedTime }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleMapsConfig.googleMapsApiKey,
    libraries: googleMapsConfig.libraries,
  });

  const mapRef = useRef<google.maps.Map | null>(null);
  const [filteredGeoJson, setFilteredGeoJson] = useState<GeoJSON.FeatureCollection | null>(null);
  const [clickedZone, setClickedZone] = useState<{ position: google.maps.LatLng; name: string; busyness: number } | null>(null);
  const [showGeoJson, setShowGeoJson] = useState(true);
  const [showLegend, setShowLegend] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<null | any>(null);
  const [popupPosition, setPopupPosition] = useState<{ x: number, y: number } | null>(null);

  const containerStyle = {
    width: '100%',
    height: '100vh',
    position: 'relative' as 'relative',
  };

  useEffect(() => {
    fetch('/data/NYC_Taxi_Zones.geojson')
      .then(response => response.json())
      .then(data => {
        const filteredData: GeoJSON.FeatureCollection = {
          type: "FeatureCollection",
          features: data.features.filter((feature: any) => feature.properties.borough === "Manhattan"),
        };
        setFilteredGeoJson(filteredData);
      })
      .catch(error => console.error('Error loading GeoJSON data:', error));
  }, []);

  useEffect(() => {
    if (isLoaded && mapRef.current && filteredGeoJson) {
      const map = mapRef.current;

      map.data.forEach((feature: any) => {
        map.data.remove(feature);
      });

      if (showGeoJson && filteredGeoJson) {
        map.data.addGeoJson(filteredGeoJson);

        map.data.setStyle((feature: any) => {
          const zoneId = feature.getProperty('objectid');
          let busyness = 0;
          if (selectedTime && busynessData) {
            const formattedSelectedTime = moment(selectedTime).format('YYYY-MM-DDTHH:00');
            const hourlyData = busynessData[formattedSelectedTime];

            if (hourlyData && hourlyData[zoneId]) {
              busyness = hourlyData[zoneId][0];
            }
          }

          const color = getBusynessColor(busyness);

          return {
            fillColor: color,
            fillOpacity: 0.9,
            strokeColor: 'white',
            strokeWeight: 1,
          };
        });

        map.data.addListener('click', (event: any) => {
          const { latLng } = event;
          const zoneName = event.feature.getProperty('zone');
          const zoneId = event.feature.getProperty('objectid');
          let busyness = 0;

          if (selectedTime && busynessData) {
            const formattedSelectedTime = moment(selectedTime).format('YYYY-MM-DDTHH:00');
            const hourlyData = busynessData[formattedSelectedTime];

            if (hourlyData && hourlyData[zoneId]) {
              busyness = hourlyData[zoneId][0];
            }
          }

          setClickedZone({
            position: latLng,
            name: zoneName,
            busyness: busyness
          });
        });
      }
    }
  }, [isLoaded, filteredGeoJson, busynessData, selectedTime, showGeoJson]);

  const getBusynessColor = (busyness: number) => {
    if (busyness <= 1) return '#185394'; 
    if (busyness <= 2) return '#276cad';
    if (busyness <= 3) return '#4e9bc7'; 
    if (busyness <= 4) return '#add2e4'; 
    if (busyness <= 5) return '#ecf3f5'; 
    if (busyness <= 6) return '#fddecc'; 
    if (busyness <= 7) return '#f4a886'; 
    if (busyness <= 8) return '#e98e6f'; 
    if (busyness <= 9) return '#ce5246'; 
    return '#c6403d'; 
  };

  const getPopupPosition = (latLng: google.maps.LatLng) => {
    if (!mapRef.current) return { display: 'none' };

    const map = mapRef.current;
    const scale = Math.pow(2, map.getZoom());
    const projection = map.getProjection();
    const bounds = map.getBounds();

    if (projection && bounds) {
      const nw = projection.fromLatLngToPoint(bounds.getNorthEast());
      const se = projection.fromLatLngToPoint(bounds.getSouthWest());
      const worldPoint = projection.fromLatLngToPoint(latLng);

      const pos = {
        x: (worldPoint.x - se.x) * scale,
        y: (worldPoint.y - nw.y) * scale,
      };

      return {
        left: `${pos.x - 210}px`, // Adjust x to center the popup
        top: `${pos.y - 160}px`, // Adjust y to position the popup above the marker
        position: 'absolute' as 'absolute',
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

  const handleToggleGeoJson = () => {
    setShowGeoJson(!showGeoJson);
    setShowLegend(!showLegend);
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
            onClick={(e) => {
              setSelectedEvent(event);
              setPopupPosition(getPopupPosition(e.latLng));
            }}
          />
        ))}
      </GoogleMap>

      {clickedZone && (
        <div id="zone-info" style={popupPosition}>
          <h4>{clickedZone.name}</h4>
          <p>Busyness: {clickedZone.busyness}</p>
        </div>
      )}

      {selectedEvent && (
        <div style={popupPosition}>
          <ScheduleCard_Popup
            id={selectedEvent.id}
            name={selectedEvent.name}
            startTime={selectedEvent.startTime}
            endTime={selectedEvent.endTime}
            latitude={selectedEvent.latitude}
            longitude={selectedEvent.longitude}
            busyness={selectedEvent.busyness}
            category={selectedEvent.category}
            address={selectedEvent.address}
            website={selectedEvent.website}
            description={selectedEvent.description}
            rating={selectedEvent.rating}
            attraction_phone_number={selectedEvent.attraction_phone_number}
            international_phone_number={selectedEvent.international_phone_number}
            event_image={selectedEvent.event_image}
            event={selectedEvent.event}
            free={selectedEvent.free}
            userRatings_total={selectedEvent.userRatings_total}
            index={events.findIndex(e => e.id === selectedEvent.id) + 1}
            onStartTimeClick={(startTime) => console.log('Start time clicked:', startTime)}
            onClose={() => setSelectedEvent(null)}
          />
        </div>
      )}

      {showLegend && <Legend />}

      <button
        onClick={handleToggleGeoJson}
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
          color: 'white'
        }}
      >
        {showGeoJson ? 'Hide Busyness Data' : 'Show Busyness Data'}
      </button>
    </div>
  );
};

export default Map_Schedule;
