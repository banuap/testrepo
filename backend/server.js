const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample allocations data
const allocations = [
  {
    id: 1,
    title: 'Project Alpha',
    employee: 'John Doe',
    role: 'Senior Developer',
    allocation: 80,
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    status: 'active',
    description: 'Full-stack development for enterprise client portal'
  },
  {
    id: 2,
    title: 'Project Beta',
    employee: 'Jane Smith',
    role: 'UI/UX Designer',
    allocation: 100,
    startDate: '2024-02-01',
    endDate: '2024-05-15',
    status: 'active',
    description: 'Design system implementation and user research'
  },
  {
    id: 3,
    title: 'Project Gamma',
    employee: 'Mike Johnson',
    role: 'DevOps Engineer',
    allocation: 50,
    startDate: '2024-03-01',
    endDate: '2024-12-31',
    status: 'active',
    description: 'Infrastructure automation and CI/CD pipeline setup'
  },
  {
    id: 4,
    title: 'Project Delta',
    employee: 'Sarah Williams',
    role: 'Product Manager',
    allocation: 60,
    startDate: '2024-01-10',
    endDate: '2024-04-30',
    status: 'completed',
    description: 'Product roadmap planning and stakeholder management'
  },
  {
    id: 5,
    title: 'Project Epsilon',
    employee: 'Tom Brown',
    role: 'QA Engineer',
    allocation: 75,
    startDate: '2024-02-15',
    endDate: '2024-07-31',
    status: 'active',
    description: 'Test automation framework development and quality assurance'
  },
  {
    id: 6,
    title: 'Project Zeta',
    employee: 'Emily Davis',
    role: 'Data Analyst',
    allocation: 90,
    startDate: '2024-01-20',
    endDate: '2024-06-15',
    status: 'active',
    description: 'Business intelligence dashboard creation and data analysis'
  }
];

// API Routes
app.get('/api/allocations', (req, res) => {
  const { status } = req.query;
  
  if (status) {
    const filtered = allocations.filter(a => a.status === status);
    return res.json(filtered);
  }
  
  res.json(allocations);
});

app.get('/api/allocations/:id', (req, res) => {
  const allocation = allocations.find(a => a.id === parseInt(req.params.id));
  
  if (!allocation) {
    return res.status(404).json({ message: 'Allocation not found' });
  }
  
  res.json(allocation);
});

app.get('/api/stats', (req, res) => {
  const stats = {
    totalAllocations: allocations.length,
    activeAllocations: allocations.filter(a => a.status === 'active').length,
    completedAllocations: allocations.filter(a => a.status === 'completed').length,
    averageAllocation: Math.round(allocations.reduce((sum, a) => sum + a.allocation, 0) / allocations.length)
  };
  
  res.json(stats);
});

app.get('/', (req, res) => {
  res.json({ message: 'Manager Dashboard API' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
