import React, { useState, useEffect } from 'react';
import AllocationCard from './AllocationCard';
import './Dashboard.css';

const Dashboard = () => {
  const [allocations, setAllocations] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchData();
  }, [filter]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch allocations
      const allocUrl = filter === 'all' 
        ? `${API_URL}/api/allocations`
        : `${API_URL}/api/allocations?status=${filter}`;
      
      const allocResponse = await fetch(allocUrl);
      if (!allocResponse.ok) {
        throw new Error('Failed to fetch allocations');
      }
      const allocData = await allocResponse.json();
      setAllocations(allocData);

      // Fetch stats
      const statsResponse = await fetch(`${API_URL}/api/stats`);
      if (!statsResponse.ok) {
        throw new Error('Failed to fetch stats');
      }
      const statsData = await statsResponse.json();
      setStats(statsData);

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-top">
          <button className="back-button">←</button>
          <h1 className="dashboard-title">Manager Dashboard</h1>
          <div className="header-actions">
            <button className="icon-button">🔔</button>
            <button className="icon-button">⋮</button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        {stats && (
          <section className="stats-section">
            <div className="stat-card">
              <div className="stat-value">{stats.totalAllocations}</div>
              <div className="stat-label">Total Allocations</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.activeAllocations}</div>
              <div className="stat-label">Active Projects</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.completedAllocations}</div>
              <div className="stat-label">Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.averageAllocation}%</div>
              <div className="stat-label">Avg Allocation</div>
            </div>
          </section>
        )}

        <section className="allocations-section">
          <div className="section-header">
            <h2 className="section-title">Current Allocations →</h2>
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
                onClick={() => setFilter('active')}
              >
                Active
              </button>
              <button 
                className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                onClick={() => setFilter('completed')}
              >
                Completed
              </button>
            </div>
          </div>

          {loading && (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading allocations...</p>
            </div>
          )}

          {error && (
            <div className="error-state">
              <p>Error: {error}</p>
              <p className="error-hint">Make sure the backend server is running on port 5000</p>
              <button onClick={fetchData} className="retry-button">Retry</button>
            </div>
          )}

          {!loading && !error && allocations.length === 0 && (
            <div className="empty-state">
              <p>No allocations found</p>
            </div>
          )}

          {!loading && !error && allocations.length > 0 && (
            <div className="allocations-grid">
              {allocations.map(allocation => (
                <AllocationCard key={allocation.id} allocation={allocation} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
