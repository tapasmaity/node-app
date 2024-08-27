const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const port = 3000;

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

app.use(express.json());

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for JSONPlaceholder',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'JSONPlaceholder',
      url: 'https://jsonplaceholder.typicode.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
};

const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API for JSONPlaceholder',
      version: '1.0.0',
      description:
        'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
      license: {
        name: 'Licensed Under MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'JSONPlaceholder',
        url: 'https://jsonplaceholder.typicode.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Development server',
      },
      {
        url: 'http://localhost:8000'
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // Optional, if you're using JWT tokens
        }
      }
    },
    security: [
      {
        BearerAuth: []
      }
    ]
  },
  apis: ['./routes/*.js']
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
mongoose.connect('mongodb+srv://tapasOne:tapas123@cluster0.yi19u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

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
