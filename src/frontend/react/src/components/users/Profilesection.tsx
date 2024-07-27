import React from 'react';
import '../../pages/dashboard/Dashboard.css';

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
            </div>
        </div>
    );
};

export default ProfileSection;
