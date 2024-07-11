// ZoneInfo.tsx
import { OverlayView } from '@react-google-maps/api';
import React from 'react';

interface ZoneInfoProps {
  position: google.maps.LatLng;
  name: string;
  busyness: number;
}

const ZoneInfo: React.FC<ZoneInfoProps> = ({ position, name, busyness }) => {
  return (
    <OverlayView
      position={position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div style={{
        position: 'absolute',
        transform: 'translate(-50%, -115%)',  
        padding: '5px',
        background: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px',
        whiteSpace: 'nowrap',  
      }}>
        <h4 style={{ margin: 0 }}>{name}</h4>
        <p style={{ margin: 0 }}>Busyness: {busyness}</p>
      </div>
    </OverlayView>
  );
};

export default ZoneInfo;
