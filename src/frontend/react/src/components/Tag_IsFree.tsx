import React from 'react';
import theme from '../theme';

const Tag = ({ isFree }) => {
  return (
    <span style={{
      backgroundColor: '#4CAF50', 
      color: 'white',
      padding: '0px 9px',
      borderRadius: '4px',
      fontSize: '12px',
      // fontWeight: 'bold',
      // display: 'inline-block'
    }}>
      free
    </span>
  );
}

export default Tag;
