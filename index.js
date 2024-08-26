const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const port = 3000;

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

app.use(express.json());
const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Demo',
      version: '1.0.0',
    },
    servers: [
      {
        url: `http://localhost:${port}`
      },
      {
        url: `http://localhost:8000`
      }
    ]
  },
  apis: ['./routes/*.js'],
};

const openapiSpecification = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));


app.get('/', (req, res) => {
  res.send('Welcome to docker initialize');
});

app.use("/api", require("./routes/sampleRoutes"));

// Get the connection string from environment variables
const dbURI = process.env.DB_URI;

// Connect to the database
mongoose.connect(dbURI);

// Get the default connection
const db = mongoose.connection;

// Handle connection events
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to the database');
});





app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
