// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db'); // Import the database connection
const authRoutes = require('./routes/authRoutes'); // Import the auth routes
const messageRoutes = require('./routes/messageRoutes'); // Import the message routes

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api', messageRoutes);
// Root route for testing
app.get('/', (req, res) => {
    res.send('Authentication API is running');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
