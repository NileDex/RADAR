import React from 'react';
import './page.css';
import { Carousel } from './Add'; // Import Carousel as a named export
import MovementPrice from './Movementprice';

export const HomePage = () => {
  // Placeholder GitHub statistics
  const githubStats = {
    totalRepos: 10,
    totalStars: 150,
    totalForks: 45,
  };

  return (
    <div className="page-container">


      <div className="grid-container">
        <div className="card">
          <MovementPrice />
        </div>
        <div className="card2">
          <h2>GitHub Statistics</h2>
          <div className="github-stats">
            <p>
              <strong>Total Repositories:</strong> {githubStats.totalRepos}
            </p>
            <p>
              <strong>Total Stars:</strong> {githubStats.totalStars}
            </p>
            <p>
              <strong>Total Forks:</strong> {githubStats.totalForks}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SettingsPage = () => (
  <div className="page-container">
    <div className="card">
      <h2>Settings</h2>
      <div className="settings-row">
        <span>Notifications</span>
        <button className="settings-button">Configure</button>
      </div>
      <div className="settings-row">
        <span>Profile Settings</span>
        <button className="settings-button">Edit</button>
      </div>
    </div>
  </div>
);
