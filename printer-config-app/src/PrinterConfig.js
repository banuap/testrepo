import React, { useState, useEffect } from 'react';
import './PrinterConfig.css';

const PrinterConfig = () => {
  const [profiles, setProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({
    name: '',
    ipAddress: '',
    port: '9100',
    colorMode: 'color',
    paperSize: 'A4',
    quality: 'normal',
    duplex: 'none',
    orientation: 'portrait',
  });
  const [selectedProfileName, setSelectedProfileName] = useState('');
  const [errors, setErrors] = useState({});

  // Predefined presets
  const presets = {
    'Draft Documents': {
      colorMode: 'grayscale',
      quality: 'draft',
      duplex: 'long-edge',
      paperSize: 'A4',
    },
    'Photo Quality': {
      colorMode: 'color',
      quality: 'high',
      duplex: 'none',
      paperSize: 'Photo 4x6',
    },
    'Text Heavy': {
      colorMode: 'grayscale',
      quality: 'normal',
      duplex: 'long-edge',
      paperSize: 'A4',
    },
  };

  // Load profiles from localStorage on mount
  useEffect(() => {
    const savedProfiles = localStorage.getItem('printerProfiles');
    if (savedProfiles) {
      setProfiles(JSON.parse(savedProfiles));
    }
  }, []);

  // Save profiles to localStorage whenever they change
  useEffect(() => {
    if (profiles.length > 0) {
      localStorage.setItem('printerProfiles', JSON.stringify(profiles));
    }
  }, [profiles]);

  const validateIP = (ip) => {
    const parts = ip.split('.');
    if (parts.length !== 4) return false;
    return parts.every(part => {
      const num = parseInt(part, 10);
      return num >= 0 && num <= 255 && part === num.toString();
    });
  };

  const validatePort = (port) => {
    const num = parseInt(port, 10);
    return num >= 1 && num <= 65535;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProfile({ ...currentProfile, [name]: value });
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSaveProfile = () => {
    const newErrors = {};

    if (!currentProfile.name.trim()) {
      newErrors.name = 'Profile name is required';
    }

    if (!currentProfile.ipAddress.trim()) {
      newErrors.ipAddress = 'IP address is required';
    } else if (!validateIP(currentProfile.ipAddress)) {
      newErrors.ipAddress = 'Invalid IP address format';
    }

    if (!currentProfile.port.trim()) {
      newErrors.port = 'Port is required';
    } else if (!validatePort(currentProfile.port)) {
      newErrors.port = 'Port must be between 1 and 65535';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const existingIndex = profiles.findIndex(p => p.name === currentProfile.name);
    let updatedProfiles;
    
    if (existingIndex >= 0) {
      updatedProfiles = [...profiles];
      updatedProfiles[existingIndex] = currentProfile;
    } else {
      updatedProfiles = [...profiles, currentProfile];
    }

    setProfiles(updatedProfiles);
    setSelectedProfileName(currentProfile.name);
    alert(`Profile "${currentProfile.name}" saved successfully!`);
  };

  const handleLoadProfile = (profileName) => {
    const profile = profiles.find(p => p.name === profileName);
    if (profile) {
      setCurrentProfile(profile);
      setSelectedProfileName(profileName);
      setErrors({});
    }
  };

  const handleDeleteProfile = (profileName) => {
    if (window.confirm(`Are you sure you want to delete profile "${profileName}"?`)) {
      const updatedProfiles = profiles.filter(p => p.name !== profileName);
      setProfiles(updatedProfiles);
      if (selectedProfileName === profileName) {
        setSelectedProfileName('');
      }
    }
  };

  const handleApplyPreset = (presetName) => {
    const preset = presets[presetName];
    setCurrentProfile({ ...currentProfile, ...preset });
  };

  const handleNewProfile = () => {
    setCurrentProfile({
      name: '',
      ipAddress: '',
      port: '9100',
      colorMode: 'color',
      paperSize: 'A4',
      quality: 'normal',
      duplex: 'none',
      orientation: 'portrait',
    });
    setSelectedProfileName('');
    setErrors({});
  };

  return (
    <div className="printer-config-container">
      <header className="printer-config-header">
        <h1>Smart Printer Configuration</h1>
        <p>Design and configure your printer settings with ease</p>
      </header>

      <div className="config-content">
        {/* Presets Section */}
        <section className="presets-section">
          <h2>Quick Presets</h2>
          <div className="preset-buttons">
            {Object.keys(presets).map(presetName => (
              <button
                key={presetName}
                className="preset-button"
                onClick={() => handleApplyPreset(presetName)}
                title={`Apply ${presetName} preset`}
              >
                {presetName}
              </button>
            ))}
          </div>
        </section>

        <div className="main-content">
          {/* Saved Profiles Section */}
          <aside className="profiles-sidebar">
            <h2>Saved Profiles</h2>
            <button className="new-profile-button" onClick={handleNewProfile}>
              + New Profile
            </button>
            <div className="profiles-list">
              {profiles.length === 0 ? (
                <p className="no-profiles">No saved profiles</p>
              ) : (
                profiles.map(profile => (
                  <div
                    key={profile.name}
                    className={`profile-item ${selectedProfileName === profile.name ? 'active' : ''}`}
                  >
                    <button
                      className="profile-load-button"
                      onClick={() => handleLoadProfile(profile.name)}
                    >
                      {profile.name}
                    </button>
                    <button
                      className="profile-delete-button"
                      onClick={() => handleDeleteProfile(profile.name)}
                      title="Delete profile"
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>
          </aside>

          {/* Configuration Form */}
          <section className="config-form-section">
            <h2>Printer Settings</h2>
            <form className="config-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="name">Profile Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={currentProfile.name}
                  onChange={handleInputChange}
                  placeholder="Enter profile name"
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="ipAddress">IP Address *</label>
                  <input
                    type="text"
                    id="ipAddress"
                    name="ipAddress"
                    value={currentProfile.ipAddress}
                    onChange={handleInputChange}
                    placeholder="192.168.1.100"
                    className={errors.ipAddress ? 'error' : ''}
                  />
                  {errors.ipAddress && <span className="error-message">{errors.ipAddress}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="port">Port *</label>
                  <input
                    type="text"
                    id="port"
                    name="port"
                    value={currentProfile.port}
                    onChange={handleInputChange}
                    placeholder="9100"
                    className={errors.port ? 'error' : ''}
                  />
                  {errors.port && <span className="error-message">{errors.port}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="colorMode">Color Mode</label>
                  <select
                    id="colorMode"
                    name="colorMode"
                    value={currentProfile.colorMode}
                    onChange={handleInputChange}
                  >
                    <option value="color">Color</option>
                    <option value="grayscale">Grayscale</option>
                    <option value="monochrome">Monochrome</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="paperSize">Paper Size</label>
                  <select
                    id="paperSize"
                    name="paperSize"
                    value={currentProfile.paperSize}
                    onChange={handleInputChange}
                  >
                    <option value="A4">A4</option>
                    <option value="Letter">Letter</option>
                    <option value="Legal">Legal</option>
                    <option value="Photo 4x6">Photo 4x6</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="quality">Print Quality</label>
                  <select
                    id="quality"
                    name="quality"
                    value={currentProfile.quality}
                    onChange={handleInputChange}
                  >
                    <option value="draft">Draft</option>
                    <option value="normal">Normal</option>
                    <option value="high">High Quality</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="duplex">Duplex Printing</label>
                  <select
                    id="duplex"
                    name="duplex"
                    value={currentProfile.duplex}
                    onChange={handleInputChange}
                  >
                    <option value="none">None (Single-sided)</option>
                    <option value="long-edge">Long Edge (Book)</option>
                    <option value="short-edge">Short Edge (Flip)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="orientation">Orientation</label>
                <select
                  id="orientation"
                  name="orientation"
                  value={currentProfile.orientation}
                  onChange={handleInputChange}
                >
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
              </div>

              <div className="form-actions">
                <button type="button" className="save-button" onClick={handleSaveProfile}>
                  Save Profile
                </button>
                <button type="button" className="reset-button" onClick={handleNewProfile}>
                  Reset Form
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrinterConfig;
