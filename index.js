const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});


// Get the connection string from environment variables
const dbURI = process.env.DB_URI;

// Connect to the database
mongoose.connect(dbURI);

// Get the default connection
const db = mongoose.connection;

// Handle connection events
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to the database');
});





app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
