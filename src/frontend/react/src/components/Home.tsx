import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleStartNow = () => {
    navigate('/activity');
  };

  return (
    <div className="home">
      <div className="intro">
        <h1>Smart Tourist Guide in New York</h1>
        <p>Can have a subtitle if useful</p>
        <p>
          Discover your next adventure with our travel planning app! Effortlessly organize your trips, find top destinations, and get personalized recommendations—all in one place. Start planning your dream vacation today!
        </p>
        <button onClick={handleStartNow}>Start Now</button>
        <button onClick={() => navigate('/about')}>About</button>
      </div>
      <div className="illustration">Illustration</div>
    </div>
  );
};

export default Home;
