import React from 'react';
import theme from '../theme';

const Tag = ({ category }) => {


  return (
    <span  style={{
      backgroundColor: '#72b2c7', 
      color: 'white',
      padding: '0px 9px',
      borderRadius: '4px',
      fontSize: '12px',
      marginRight: '6px', 
      display: 'inline-block' ,
      boxSizing: 'border-box',
    }}>
      {category}
    </span>
  );
}

export default Tag;
