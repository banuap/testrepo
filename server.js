const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for sprint capacity data
let sprintCapacity = {
  sprintName: '',
  teamMembers: [],
  totalCapacity: 0
};

// GET endpoint to retrieve sprint capacity
app.get('/api/sprint-capacity', (req, res) => {
  res.json(sprintCapacity);
});

// POST endpoint to save sprint capacity
app.post('/api/sprint-capacity', (req, res) => {
  const { sprintName, teamMembers } = req.body;
  
  // Calculate total capacity
  const totalCapacity = teamMembers.reduce((sum, member) => {
    return sum + (parseFloat(member.availableHours) || 0);
  }, 0);
  
  sprintCapacity = {
    sprintName,
    teamMembers,
    totalCapacity
  };
  
  res.json({ 
    message: 'Sprint capacity saved successfully',
    data: sprintCapacity
  });
});

// DELETE endpoint to clear sprint capacity
app.delete('/api/sprint-capacity', (req, res) => {
  sprintCapacity = {
    sprintName: '',
    teamMembers: [],
    totalCapacity: 0
  };
  res.json({ message: 'Sprint capacity cleared successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
