import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import OwnerView from './pages/OwnerView';
import './App.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/owner" element={<OwnerView />} />
        {/* ... */}
      </Routes>
    </HashRouter>
  );
}

export default App;
