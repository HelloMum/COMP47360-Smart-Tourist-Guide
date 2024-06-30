import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about">
      <div className="section features">
        <h2>Features</h2>
      </div>
      <div className="section data-algorithm">
        <h2>Data & Algorithm</h2>
      </div>
      <div className="section team">
        <h2>Team</h2>
      </div>
    </div>
  );
};

export default About;
