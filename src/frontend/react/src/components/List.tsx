import React from 'react';
import Map from './Map';
import './List.css';

const List: React.FC = () => {
  return (
    <div className="list">
      <div className="list-content">
        <h2>List22</h2>
      </div>
      <div className="map">
        <Map />
      </div>
    </div>
  );
};

export default List;
