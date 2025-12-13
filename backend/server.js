const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock user data (in a real application, this would be in a database)
const users = [
  {
    id: 1,
    email: 'user@example.com',
    password: 'password123' // In production, passwords should be hashed
  },
  {
    id: 2,
    email: 'admin@example.com',
    password: 'admin123'
  }
];

// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Validate request body
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }

  // Find user
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    // In a real application, you would generate a JWT token here
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Test the server at http://localhost:${PORT}/api/health`);
});
