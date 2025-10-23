import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('allocations');

  return (
    <div className="App">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'allocations' && <Dashboard />}
      {activeTab === 'dashboard' && <Dashboard />}
      {activeTab === 'team' && <div className="placeholder-content"><h2>Team View Coming Soon</h2></div>}
      {activeTab === 'reports' && <div className="placeholder-content"><h2>Reports View Coming Soon</h2></div>}
    </div>
  );
}

export default App;
