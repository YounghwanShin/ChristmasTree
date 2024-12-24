import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import OwnerView from './pages/OwnerView';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/owner" element={<OwnerView />} />
      </Routes>
    </Router>
  );
}

export default App;
