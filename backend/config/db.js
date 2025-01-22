const mongoose = require('mongoose');
require('dotenv').config();  // Load environment variables from .env

// Get MongoDB URI from environment variable
const mongoURI = process.env.MONGO_URI;

// Function to connect to the database
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
