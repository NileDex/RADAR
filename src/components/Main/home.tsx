import React from "react";
import "./HomePage.css";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to My App</h1>
        <p>Sign up or log in with your GitHub account to get started!</p>
      </header>
      <div className="action-container">

      </div>
    </div>
  );
};

export default Home;
