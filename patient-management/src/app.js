const express = require('express');
const bodyParser = require('body-parser');
const patientRoutes = require('./routes/patientRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/api/patients', patientRoutes);

module.exports = app;
