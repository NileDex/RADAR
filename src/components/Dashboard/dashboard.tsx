import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../Sidebar/sidebar';
import Header from '../Header/header';
import { HomePage, SettingsPage } from '../Main/page';
import Footer from '../Footer/footer';
import './dashboard.css';
import LearningRoadmap from './Learningprogress';
import Lesson1 from './Lesson-01';  // Import the lesson components
import Lesson2 from './Lesson-02';
import Lesson3 from './Lesson-03';

import Home from '../Main/home';
// import SApp from '../Main/schedule/schedule';


const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="dashboard">
      <Header onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="main-container">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        
        <main className="content">
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path="/page" element={<HomePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/Learningprogress" element={<LearningRoadmap />} />
            <Route path="/lesson-1" element={<Lesson1 />} />
            <Route path="/lesson-2" element={<Lesson2 />} />
            <Route path="/lesson-3" element={<Lesson3 />} />
            {/* <Route path="/schedule" element={<SApp/>} /> */}
          </Routes>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
