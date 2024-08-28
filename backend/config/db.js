const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// MongoDB connection URI from environment variables
const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err.message);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;
