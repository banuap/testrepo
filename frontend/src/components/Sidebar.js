import React from 'react';
import './Sidebar.css';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'allocations', label: 'Allocations', icon: '📋' },
    { id: 'team', label: 'Team', icon: '👥' },
    { id: 'reports', label: 'Reports', icon: '📈' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <button className="menu-button">☰</button>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
