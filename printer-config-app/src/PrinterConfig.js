import React, { useState } from 'react';
import './PrinterConfig.css';

function PrinterConfig() {
  const [printerData, setPrinterData] = useState({
    name: '',
    ipAddress: '',
    port: '9100',
    model: '',
    location: '',
    description: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrinterData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!printerData.name.trim()) {
      newErrors.name = 'Printer name is required';
    }
    
    if (!printerData.ipAddress.trim()) {
      newErrors.ipAddress = 'IP address is required';
    } else if (!/^(\d{1,3}\.){3}\d{1,3}$/.test(printerData.ipAddress)) {
      newErrors.ipAddress = 'Invalid IP address format';
    }
    
    if (!printerData.port.trim()) {
      newErrors.port = 'Port is required';
    } else if (!/^\d+$/.test(printerData.port)) {
      newErrors.port = 'Port must be a number';
    }
    
    if (!printerData.model.trim()) {
      newErrors.model = 'Printer model is required';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      console.log('Printer configuration saved:', printerData);
      alert('Printer configuration saved successfully!');
    } else {
      setErrors(newErrors);
    }
  };

  const handleReset = () => {
    setPrinterData({
      name: '',
      ipAddress: '',
      port: '9100',
      model: '',
      location: '',
      description: ''
    });
    setErrors({});
  };

  return (
    <div className="printer-config-container">
      <div className="printer-config-card">
        <h1 className="printer-config-title">Printer Configuration</h1>
        <p className="printer-config-subtitle">Configure your network printer settings</p>
        
        <form onSubmit={handleSubmit} className="printer-config-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Printer Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={printerData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? 'input-error' : ''}`}
              placeholder="e.g., Office Printer 1"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="ipAddress" className="form-label">
              IP Address <span className="required">*</span>
            </label>
            <input
              type="text"
              id="ipAddress"
              name="ipAddress"
              value={printerData.ipAddress}
              onChange={handleChange}
              className={`form-input ${errors.ipAddress ? 'input-error' : ''}`}
              placeholder="e.g., 192.168.1.100"
            />
            {errors.ipAddress && <span className="error-message">{errors.ipAddress}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="port" className="form-label">
              Port <span className="required">*</span>
            </label>
            <input
              type="text"
              id="port"
              name="port"
              value={printerData.port}
              onChange={handleChange}
              className={`form-input ${errors.port ? 'input-error' : ''}`}
              placeholder="e.g., 9100"
            />
            {errors.port && <span className="error-message">{errors.port}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="model" className="form-label">
              Printer Model <span className="required">*</span>
            </label>
            <input
              type="text"
              id="model"
              name="model"
              value={printerData.model}
              onChange={handleChange}
              className={`form-input ${errors.model ? 'input-error' : ''}`}
              placeholder="e.g., HP LaserJet Pro M404"
            />
            {errors.model && <span className="error-message">{errors.model}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={printerData.location}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., Building A, 2nd Floor"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={printerData.description}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Additional notes about this printer"
              rows="3"
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleReset} className="btn btn-secondary">
              Reset
            </button>
            <button type="submit" className="btn btn-primary">
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PrinterConfig;
