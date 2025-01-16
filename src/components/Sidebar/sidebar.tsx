import React from 'react';
import { useNavigate } from 'react-router-dom';
import './sidebar.css';

// Define the props type
type SidebarProps = {
  isOpen: boolean; // isOpen is a boolean
  onClose: () => void; // onClose is a function with no arguments and no return value
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  return (
    <>
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose}></div>
      )}
      
      <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={onClose}>✕</button>
        
        <div className="nav-links">
          <button onClick={() => navigate('/page')} className="nav-item">
            <span className="icon">🏠</span>
            <span>Home</span>
          </button>
          
          <button onClick={() => navigate('/settings')} className="nav-item">
            <span className="icon">⚙️</span>
            <span>Settings</span>
          </button>

          <button onClick={() => navigate('/Learningprogress')} className="nav-item">
            <span className="icon">📚</span> {/* Changed the icon for Learning Progress */}
            <span>Learning Progress</span> {/* Changed the label */}
          </button>
          <button onClick={() => navigate('/schedule')} className="nav-item">
            <span className="icon"></span> {/* Changed the icon for Learning Progress */}
            <span>Schedule</span> {/* Changed the label */}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
