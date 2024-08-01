const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const prescriptionRoutes = require('./routes/prescriptionRoutes');
const cors = require('cors');

const app = express();

app.use(cors());

// Connect to MongoDB
connectDB();

app.use(bodyParser.json());

app.use('/api/prescriptions', prescriptionRoutes);

module.exports = app;
