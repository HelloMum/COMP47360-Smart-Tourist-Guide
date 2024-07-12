import React, { useRef, useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, Marker, OverlayView } from '@react-google-maps/api';
import moment from 'moment';
import ScheduleCard_Popup from './ScheduleCard_PopUp';
import Legend from './Legend';
import mapOptions from '../../utils/mapStyles';
import googleMapsConfig from '../../utils/apiConfig';
import ToggleButton from './ToggleButton'; 
import { getColor } from './colorMappings';  
import ZoneInfo from './ZoneInfo';
import ZoneBusyness from './ZoneBusyness';

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
  const [hoveredZone, setHoveredZone] = useState<{ position: google.maps.LatLng; name: string; busyness: number } | null>(null);
  const [selectedZone, setSelectedZone] = useState<{ id: number; name: string; position: { lat: number; lng: number } } | null>(null); // Updated state
  const [highlightedZone, setHighlightedZone] = useState<number | null>(null);
  const [showGeoJson, setShowGeoJson] = useState(true);
  const [showLegend, setShowLegend] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<null | any>(null);

  // New state for map center and zoom level
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({ lat: 40.732, lng: -73.99 });
  const [mapZoom, setMapZoom] = useState<number>(12.5);

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

            if (hourlyData && hourlyData[zoneId] !== undefined) {
              busyness = hourlyData[zoneId];
            }
          }

          const color = getColor(busyness);

          return {
            fillColor: color,
            fillOpacity: highlightedZone === zoneId ? 1 : 0.9,
            strokeColor: '#fff', 
            strokeWeight: highlightedZone === zoneId ? 3 : 1,
            strokeOpacity: 0.8, 
          };
        });

        map.data.addListener('mouseover', (event: any) => {
          const { latLng } = event;
          const zoneName = event.feature.getProperty('zone');
          const zoneId = event.feature.getProperty('objectid');
          let busyness = 0;

          if (selectedTime && busynessData) {
            const formattedSelectedTime = moment(selectedTime).format('YYYY-MM-DDTHH:00');
            const hourlyData = busynessData[formattedSelectedTime];

            if (hourlyData && hourlyData[zoneId] !== undefined) {
              busyness = hourlyData[zoneId];
            }
          }

          setHoveredZone({
            position: latLng,
            name: zoneName,
            busyness: busyness
          });

          map.data.overrideStyle(event.feature, { fillOpacity: 1 });
        });

        map.data.addListener('mouseout', (event: any) => {
          setHoveredZone(null);
          map.data.revertStyle(event.feature);
        });

        map.data.addListener('click', (event: any) => {
          const zoneId = event.feature.getProperty('objectid');
          const zoneName = event.feature.getProperty('zone'); // Get zone name
          const position = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
          };
          setSelectedZone({ id: zoneId, name: zoneName, position: position }); // Set selected zone with name
          setHighlightedZone(zoneId); // Highlight the selected zone
        });
      }
    }

    if (isLoaded && mapRef.current) {
      const map = mapRef.current;

      map.data.setStyle((feature: any) => {
        const zoneId = feature.getProperty('objectid');
        let busyness = 0;
        if (selectedTime && busynessData) {
          const formattedSelectedTime = moment(selectedTime).format('YYYY-MM-DDTHH:00');
          const hourlyData = busynessData[formattedSelectedTime];

          if (hourlyData && hourlyData[zoneId] !== undefined) {
            busyness = hourlyData[zoneId];
          }
        }

        const color = getColor(busyness);

        return {
          fillColor: color,
          fillOpacity: highlightedZone === zoneId ? 1 : 0.8,
          strokeColor: '#fff', 
          strokeWeight: highlightedZone === zoneId ? 2 : 1,
          strokeOpacity: 0.5, 
        };
      });
    }
  }, [isLoaded, filteredGeoJson, showGeoJson, busynessData, selectedTime, highlightedZone]); // Combined dependencies

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
    setSelectedZone(null); // Hide ZoneBusyness component when hiding data
  };

  // Handlers for maintaining map center and zoom level
  const handleDragEnd = () => {
    if (mapRef.current) {
      const newCenter = mapRef.current.getCenter();
      if (newCenter) {
        setMapCenter({ lat: newCenter.lat(), lng: newCenter.lng() });
      }
    }
  };

  const handleZoomChanged = () => {
    if (mapRef.current) {
      setMapZoom(mapRef.current.getZoom()!);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}  // Use mapCenter state
        zoom={mapZoom}      // Use mapZoom state
        options={mapOptions}  // Add map options here
        onLoad={(map) => {
          mapRef.current = map;
        }}
        onDragEnd={handleDragEnd}  // Update center on drag end
        onZoomChanged={handleZoomChanged}  // Update zoom level on zoom change
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
            onClick={() => {
              setSelectedEvent(event);
            }}
          />
        ))}

        {/* {hoveredZone && (
          <ZoneInfo
            position={hoveredZone.position}
            name={hoveredZone.name}
            busyness={hoveredZone.busyness}
          />
        )} */}

        {selectedZone && showGeoJson && (
          <OverlayView
            position={selectedZone.position}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div style={{
              position: 'absolute',
              transform: 'translate(-50%, -115%)',  
              background: 'white',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '10px'
            }}>
              <ZoneBusyness
                zoneId={selectedZone.id}
                zoneName={selectedZone.name} // Pass zone name here
                onClose={() => setSelectedZone(null)} // Handle close action
                selectedTime={selectedTime} 
              />
            </div>
          </OverlayView>
        )}

        {selectedEvent && (
          <OverlayView
            position={{ lat: selectedEvent.latitude, lng: selectedEvent.longitude }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div style={{
              position: 'absolute',
              transform: 'translate(-50%, -115%)',  // Adjust the position of the info window
              background: 'white',
              border: '1px solid #ddd',
              borderRadius: '8px',
            }}>
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
          </OverlayView>
        )}

      </GoogleMap>

      {showLegend && <Legend />}

      <ToggleButton
        showGeoJson={showGeoJson}
        handleToggleGeoJson={handleToggleGeoJson}
      />
    </div>
  );
}

export default Map_Schedule;
