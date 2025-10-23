# Manager Dashboard UI

A React and Node.js application for viewing and managing resource allocations.

## Features

- 📊 Real-time allocation tracking
- 👥 Team resource management
- 📈 Statistics dashboard
- 🎨 Modern, responsive UI with purple theme
- ⚡ Fast API with Express.js

## Project Structure

```
testrepo/
├── backend/          # Node.js Express API
│   ├── server.js     # API server with allocation endpoints
│   └── package.json
└── frontend/         # React application
    ├── src/
    │   ├── components/
    │   │   ├── Sidebar.js         # Navigation sidebar
    │   │   ├── Dashboard.js       # Main dashboard view
    │   │   └── AllocationCard.js  # Allocation display card
    │   └── App.js
    └── package.json
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The API will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will run on `http://localhost:3000`

## API Endpoints

- `GET /api/allocations` - Get all allocations
- `GET /api/allocations?status=active` - Filter by status
- `GET /api/allocations/:id` - Get specific allocation
- `GET /api/stats` - Get allocation statistics

## Usage

1. Start the backend server first (port 5000)
2. Start the frontend application (port 3000)
3. Open your browser to `http://localhost:3000`
4. View allocations in the dashboard
5. Filter by status (All/Active/Completed)

## Technologies Used

- **Frontend**: React, CSS3
- **Backend**: Node.js, Express.js
- **Design**: Material Design inspired with purple theme
