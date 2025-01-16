import React from 'react';
import './footer.css';
import { useTheme } from '../../ThemeContext';
import TrendingCoins from '../marqueetrendingcoins/Marquee';
const Footer = () => {
  const { theme, setTheme } = useTheme();

  return (
    <footer className="footer">
      <TrendingCoins/>
      <div className="footer-content">
        <p>&copy; 2025 Dashboard. All rights reserved.</p>
        <div className="theme-switcher">
          <label htmlFor="theme-select" className="theme-label">Theme:</label>
          <select
            id="theme-select"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="theme-select"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
