import React from 'react';
import { useResponsiveListWidth } from '../../utils/useResponsiveSizes';

interface ToggleButtonProps {
  showGeoJson: boolean;
  handleToggleGeoJson: () => void;
  showlist: boolean;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ showGeoJson, handleToggleGeoJson,showlist }) => {
  useResponsiveListWidth();


  return (
    <button
      onClick={handleToggleGeoJson}
      style={{
        position: 'absolute',
        top: 20,
        left: showlist?'37%':'50%',
        transform: 'translateX(-50%)',
        zIndex: 5,
        padding: '1px 10px',
        background: 'rgba(255, 165, 0, 0.9)',
        border: '1px solid #fff',
        borderRadius: '15px',
        cursor: 'pointer',
        color: 'white',
        width: '85px',
      }}
    >
      {showGeoJson ? 'hide data' : 'show data'}
    </button>
  );
};

export default ToggleButton;
