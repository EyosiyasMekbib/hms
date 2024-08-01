const express = require('express');
const bodyParser = require('body-parser');
const patientRoutes = require('./routes/patientRoutes');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

app.use(cors());

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/patients', patientRoutes);

module.exports = app;
