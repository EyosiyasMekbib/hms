const express = require('express');
const bodyParser = require('body-parser');
const appointmentRoutes = require('./routes/appointmentRoutes');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/api/appointments', appointmentRoutes);

module.exports = app;
