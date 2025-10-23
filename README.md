# testrepo - Sprint Capacity Planning Application

A full-stack web application for Sprint Capacity Planning built with React and Node.js.

## Features

- **Sprint Management**: Create and manage sprint capacity planning
- **Team Member Tracking**: Add multiple team members with their available hours
- **Real-time Capacity Calculation**: Automatically calculates total sprint capacity
- **Persistent Storage**: Save and retrieve sprint capacity data via REST API
- **Responsive UI**: Clean, modern interface that works on all devices

## Technology Stack

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web application framework
- **CORS**: Cross-Origin Resource Sharing support
- **Body-Parser**: Request body parsing middleware

### Frontend
- **React**: UI library for building user interfaces
- **CSS3**: Modern styling with responsive design

## Project Structure

```
testrepo/
├── server.js                 # Node.js/Express backend server
├── package.json             # Backend dependencies and scripts
├── client/                  # React frontend application
│   ├── src/
│   │   ├── App.js          # Main React component
│   │   ├── App.css         # Application styles
│   │   ├── SprintCapacityPlanning.js    # Sprint planning component
│   │   └── SprintCapacityPlanning.css   # Component styles
│   └── package.json        # Frontend dependencies
└── README.md               # This file
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd testrepo
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd client
npm install
cd ..
```

## Running the Application

### Start the Backend Server

```bash
npm start
```

The server will start on `http://localhost:5000`

### Start the Frontend (in a new terminal)

```bash
npm run client
```

The React app will start on `http://localhost:3000`

## API Endpoints

### GET /api/sprint-capacity
Retrieves the current sprint capacity data.

**Response:**
```json
{
  "sprintName": "Sprint 23",
  "teamMembers": [
    {
      "name": "John Doe",
      "availableHours": "40"
    }
  ],
  "totalCapacity": 40
}
```

### POST /api/sprint-capacity
Saves sprint capacity data.

**Request Body:**
```json
{
  "sprintName": "Sprint 23",
  "teamMembers": [
    {
      "name": "John Doe",
      "availableHours": "40"
    }
  ]
}
```

**Response:**
```json
{
  "message": "Sprint capacity saved successfully",
  "data": {
    "sprintName": "Sprint 23",
    "teamMembers": [...],
    "totalCapacity": 40
  }
}
```

### DELETE /api/sprint-capacity
Clears all sprint capacity data.

**Response:**
```json
{
  "message": "Sprint capacity cleared successfully"
}
```

## Usage

1. Enter a **Sprint Name** (e.g., "Sprint 23")
2. Add **Team Members** by entering:
   - Team member name
   - Available hours for the sprint
3. Click **"+ Add Team Member"** to add more team members
4. View the **Total Sprint Capacity** which updates automatically
5. Click **"Save Sprint Capacity"** to persist the data
6. Click **"Clear"** to reset all fields

## Features in Detail

### Dynamic Team Member Management
- Add unlimited team members
- Remove team members (minimum one required)
- Real-time validation of inputs

### Automatic Calculations
- Total capacity is calculated automatically as you enter data
- Supports decimal hours (e.g., 0.5 hours)

### Data Persistence
- Data is saved on the backend
- Automatically loads saved data when you return to the page

### User-Friendly Interface
- Clean, modern design
- Responsive layout for mobile and desktop
- Clear success/error messages
- Disabled state for invalid actions

## Development

To run in development mode:

Terminal 1 (Backend):
```bash
npm run dev
```

Terminal 2 (Frontend):
```bash
npm run client
```

## License

ISC
