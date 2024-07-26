import React, { useEffect, useState } from 'react';
import FetchItinerary from '../../components/users/FetchItinerary';
import Fetchstatistics from '../../components/users/Fetchstatistics';
import ProfileSection from '../../components/users/Profilesection';
import '../../pages/dashboard/Dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="left-side">
                <ProfileSection />
                <Fetchstatistics />
            </div>
            <div className="right-side">
                <FetchItinerary />
            </div>
        </div>
    );
};

export default Dashboard;
