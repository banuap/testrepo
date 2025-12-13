# testrepo

A test repository featuring a User Login UI implementation with React frontend and Node.js backend.

## Features

- **React Frontend**: Modern, responsive login UI with form validation
- **Node.js Backend**: Express server with RESTful API for authentication
- **Form Validation**: Client-side validation for email and password fields
- **Error Handling**: Comprehensive error messages and loading states
- **Responsive Design**: Beautiful gradient UI that works on all screen sizes

## Project Structure

```
testrepo/
├── login-app/          # React frontend application
│   ├── src/
│   │   ├── Login.js    # Login component with form handling
│   │   ├── Login.css   # Styling for login component
│   │   └── App.js      # Main app component
│   └── package.json
├── backend/            # Node.js backend server
│   ├── server.js       # Express server with login endpoint
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/banuap/testrepo.git
cd testrepo
```

### 2. Setup Backend

```bash
cd backend
npm install
```

### 3. Setup Frontend

```bash
cd ../login-app
npm install
```

## Running the Application

### Start Backend Server

Open a terminal and run:

```bash
cd backend
npm start
```

The server will start on `http://localhost:5000`

### Start Frontend Application

Open another terminal and run:

```bash
cd login-app
npm start
```

The React app will start on `http://localhost:3000` and automatically open in your browser.

### Configuration

**Backend Port:**
Set the `PORT` environment variable to change the backend port (default: 5000):
```bash
PORT=8080 npm start
```

**Frontend API URL:**
Set the `REACT_APP_API_URL` environment variable to configure the backend API URL (default: http://localhost:5000):
```bash
REACT_APP_API_URL=http://localhost:8080 npm start
```

## Testing the Login

### Test Credentials

Use these credentials to test the login functionality:

**User 1:**
- Email: `user@example.com`
- Password: `password123`

**User 2:**
- Email: `admin@example.com`
- Password: `admin123`

### Testing Scenarios

1. **Successful Login**: Use valid credentials from above
2. **Invalid Credentials**: Try incorrect email/password combinations
3. **Validation Errors**: 
   - Leave fields empty
   - Enter invalid email format
   - Enter password less than 6 characters
4. **Server Connection**: Stop the backend server to test connection error handling

## API Documentation

### Login Endpoint

**URL:** `POST /api/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

### Health Check Endpoint

**URL:** `GET /api/health`

**Response:**
```json
{
  "status": "Server is running"
}
```

## Features Implemented

### Frontend (React)
- ✅ Login form with email and password fields
- ✅ Client-side form validation
- ✅ Real-time error messages
- ✅ Loading state during API calls
- ✅ Success/error message display
- ✅ Responsive and modern UI design
- ✅ Form reset after successful login

### Backend (Node.js)
- ✅ Express server setup
- ✅ CORS configuration for cross-origin requests
- ✅ Login endpoint with authentication logic
- ✅ Request validation
- ✅ Error handling
- ✅ Mock user database
- ✅ Health check endpoint

## Security Notes

⚠️ **Important**: This is a demonstration application. In a production environment, you should:

- Use secure password hashing (e.g., bcrypt)
- Implement JWT tokens for session management
- Use HTTPS for secure communication
- Store sensitive data in environment variables
- Use a proper database instead of in-memory storage
- Implement rate limiting to prevent brute force attacks
- Add CSRF protection
- Validate and sanitize all inputs on the server side

## Development

### Building for Production

**Frontend:**
```bash
cd login-app
npm run build
```

**Backend:**
The backend runs as-is in production. Consider using process managers like PM2.

## Troubleshooting

### Port Already in Use

If you get "Port already in use" errors:
- Backend: Change the PORT in backend/server.js
- Frontend: Set PORT=3001 before running `npm start`

### CORS Issues

If you experience CORS issues, ensure:
- Backend server is running on port 5000
- Frontend is configured to call `http://localhost:5000/api/login`

### Module Not Found

If you get module errors:
```bash
rm -rf node_modules package-lock.json
npm install
```

## License

ISC

