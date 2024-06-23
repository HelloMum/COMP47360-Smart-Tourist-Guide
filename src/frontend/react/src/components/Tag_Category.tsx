import React from 'react';
import theme from '../theme';

const Tag = ({ category }) => {


  return (
    <span  style={{
      backgroundColor: '#4aaaaa', 
      color: 'white',
      padding: '0px 9px',
      borderRadius: '4px',
      fontSize: '12px',
      // fontWeight: 'bold',
      // display: 'inline-block'
    }}>
      {category}
    </span>
  );
}

export default Tag;
