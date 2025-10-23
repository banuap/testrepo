import React, { useState, useEffect } from 'react';
import './SprintCapacityPlanning.css';

const SprintCapacityPlanning = () => {
  const [sprintName, setSprintName] = useState('');
  const [teamMembers, setTeamMembers] = useState([
    { name: '', availableHours: '' }
  ]);
  const [totalCapacity, setTotalCapacity] = useState(0);
  const [message, setMessage] = useState('');

  const API_URL = 'http://localhost:5000/api/sprint-capacity';

  // Load existing sprint capacity on component mount
  useEffect(() => {
    fetchSprintCapacity();
  }, []);

  // Calculate total capacity whenever team members change
  useEffect(() => {
    const total = teamMembers.reduce((sum, member) => {
      return sum + (parseFloat(member.availableHours) || 0);
    }, 0);
    setTotalCapacity(total);
  }, [teamMembers]);

  const fetchSprintCapacity = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (data.sprintName) {
        setSprintName(data.sprintName);
        setTeamMembers(data.teamMembers.length > 0 ? data.teamMembers : [{ name: '', availableHours: '' }]);
      }
    } catch (error) {
      console.error('Error fetching sprint capacity:', error);
    }
  };

  const handleSprintNameChange = (e) => {
    setSprintName(e.target.value);
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index][field] = value;
    setTeamMembers(updatedMembers);
  };

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { name: '', availableHours: '' }]);
  };

  const removeTeamMember = (index) => {
    if (teamMembers.length > 1) {
      const updatedMembers = teamMembers.filter((_, i) => i !== index);
      setTeamMembers(updatedMembers);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate input
    if (!sprintName.trim()) {
      setMessage('Please enter a sprint name');
      return;
    }

    const validMembers = teamMembers.filter(m => m.name.trim() && m.availableHours);
    if (validMembers.length === 0) {
      setMessage('Please add at least one team member with valid data');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sprintName,
          teamMembers: validMembers
        }),
      });

      await response.json();
      setMessage('Sprint capacity saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error saving sprint capacity');
      console.error('Error:', error);
    }
  };

  const handleClear = async () => {
    try {
      await fetch(API_URL, {
        method: 'DELETE',
      });
      setSprintName('');
      setTeamMembers([{ name: '', availableHours: '' }]);
      setMessage('Sprint capacity cleared');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error clearing sprint capacity');
      console.error('Error:', error);
    }
  };

  return (
    <div className="sprint-capacity-container">
      <h1>Sprint Capacity Planning</h1>
      
      {message && <div className="message">{message}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Sprint Name:</label>
          <input
            type="text"
            value={sprintName}
            onChange={handleSprintNameChange}
            placeholder="e.g., Sprint 23"
            className="input-field"
          />
        </div>

        <div className="team-members-section">
          <h2>Team Members</h2>
          
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member-row">
              <input
                type="text"
                value={member.name}
                onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                placeholder="Team Member Name"
                className="input-field member-name"
              />
              <input
                type="number"
                value={member.availableHours}
                onChange={(e) => handleMemberChange(index, 'availableHours', e.target.value)}
                placeholder="Available Hours"
                className="input-field member-hours"
                min="0"
                step="0.5"
              />
              <button
                type="button"
                onClick={() => removeTeamMember(index)}
                className="btn btn-remove"
                disabled={teamMembers.length === 1}
              >
                Remove
              </button>
            </div>
          ))}
          
          <button type="button" onClick={addTeamMember} className="btn btn-add">
            + Add Team Member
          </button>
        </div>

        <div className="capacity-summary">
          <h3>Total Sprint Capacity: <span className="total-hours">{totalCapacity.toFixed(1)} hours</span></h3>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Save Sprint Capacity</button>
          <button type="button" onClick={handleClear} className="btn btn-secondary">Clear</button>
        </div>
      </form>
    </div>
  );
};

export default SprintCapacityPlanning;
