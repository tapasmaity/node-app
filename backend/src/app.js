const express = require('express');
const connectDB = require('../config/db');
const routes = require('./routes');
const { swaggerUi, swaggerDocs } = require('../config/swagger')
require('dotenv').config();
const cors = require('cors');
const app = express();

// Enable CORS for requests from 'http://localhost:3000'
app.use(cors({
    origin: 'http://localhost:3000'
}));
// Middleware
app.use(express.json());

// Connect to the database
connectDB();

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Routes
app.use('/api', routes);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
