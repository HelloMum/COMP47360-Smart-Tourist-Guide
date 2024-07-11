import React from 'react';

interface ToggleButtonProps {
  showGeoJson: boolean;
  handleToggleGeoJson: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ showGeoJson, handleToggleGeoJson }) => {
  return (
    <button
      onClick={handleToggleGeoJson}
      style={{
        position: 'absolute',
        top: 20,
        left: '35%',
        transform: 'translateX(-50%)',
        zIndex: 5,
        padding: '2px 10px',
        background: 'rgba(255, 165, 0, 0.7)',
        border: '1px solid #fff',
        borderRadius: '15px',
        cursor: 'pointer',
        color: 'white',
        width: '100px',
      }}
    >
      {showGeoJson ? 'Hide Data' : 'Show Data'}
    </button>
  );
};

export default ToggleButton;
