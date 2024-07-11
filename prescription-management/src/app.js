const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const prescriptionRoutes = require('./routes/prescriptionRoutes');

const app = express();

// Connect to MongoDB
connectDB();

app.use(bodyParser.json());

app.use('/api/prescriptions', prescriptionRoutes);

module.exports = app;
