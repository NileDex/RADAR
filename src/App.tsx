// src/App.jsx
import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from './ThemeContext';
import './App.css'
import Dashboard from './components/Dashboard/dashboard'

function App() {
  return (
    <ThemeProvider>
    <Router>
      <Dashboard />
    </Router>
  </ThemeProvider>
  )
}

export default App