import React from 'react';
import './AllocationCard.css';

const AllocationCard = ({ allocation }) => {
  const getStatusColor = (status) => {
    return status === 'active' ? '#6B5B95' : '#95A5A6';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="allocation-card">
      <div className="card-header">
        <div className="card-icon">
          <span className="icon-placeholder">
            <svg width="40" height="40" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="15" fill="#E8E2F0" />
              <path d="M20 10 L25 15 L20 20 L15 15 Z" fill="#6B5B95" />
              <circle cx="20" cy="28" r="4" fill="#6B5B95" />
            </svg>
          </span>
        </div>
        <div className="card-title-section">
          <h3 className="card-title">{allocation.title}</h3>
          <p className="card-subtitle">{allocation.employee} • {allocation.role}</p>
        </div>
        <div className="card-actions">
          <button className="more-button">⋮</button>
        </div>
      </div>
      
      <div className="card-body">
        <p className="card-description">{allocation.description}</p>
        
        <div className="card-meta">
          <div className="meta-item">
            <span className="meta-label">Duration</span>
            <span className="meta-value">{formatDate(allocation.startDate)} - {formatDate(allocation.endDate)}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Allocation</span>
            <span className="meta-value">{allocation.allocation}%</span>
          </div>
        </div>
        
        <div className="progress-section">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ 
                width: `${allocation.allocation}%`,
                backgroundColor: getStatusColor(allocation.status)
              }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="card-footer">
        <span className={`status-badge ${allocation.status}`}>
          {allocation.status.charAt(0).toUpperCase() + allocation.status.slice(1)}
        </span>
      </div>
    </div>
  );
};

export default AllocationCard;
