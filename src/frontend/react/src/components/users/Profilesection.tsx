import React from 'react';
import '../../pages/dashboard/Dashboard.css'; // Import the CSS file for styling

const ProfileSection = () => {
    return (
        <div className="profile-section">
            <h1 className="profile-title">My Profile</h1>
            <div className="profile-container">
                <div className="profile-details">
                    <img src="/path/to/profile-icon.png" alt="Profile Icon" className="profile-pic" />
                    <div className="profile-info">
                        <p>zack@tourwise.org</p>
                    </div>
                </div>
                <div className="points-section">
                    <h2>My points <span className="info-icon">ℹ️</span></h2>
                    <div className="points-display">
                        <span className="points-value">125</span>
                        <button className="claim-button">CLAIM</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;
