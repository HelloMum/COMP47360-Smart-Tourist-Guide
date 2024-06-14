import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Activity from './components/Activity';
import List from './components/List';
import Plan from './components/Plan';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/list" element={<List />} />
        <Route path="/plan" element={<Plan />} />
      </Routes>
    </Router>
  );
};

export default App;
