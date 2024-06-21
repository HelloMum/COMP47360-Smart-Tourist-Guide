import React from 'react';
import theme from '../theme';

const Tag = ({ isFree, category }) => {
  const styles = {
    base: {
      display: 'inline-block', 
      fontSize: '0.7rem', 
      padding: '1px 9px', 
      minWidth: 'auto', 
      boxShadow: '0', 
      textAlign: 'center', 
      borderRadius: '5px',
    },
    free: {
      backgroundColor: '#4b975f', 
      color: 'white'
    },
    category: {
      backgroundColor: "#aaaaaa", 
      color: 'white'
    }
  };

  const currentStyle = isFree ? { ...styles.base, ...styles.free } : { ...styles.base, ...styles.category };
  const text = isFree ? 'free' : 'category';

  return (
    <span style={currentStyle}>
      {text}
    </span>
  );
}

export default Tag;
