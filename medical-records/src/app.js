const express = require('express');
const bodyParser = require('body-parser');
const medicalRecordRoutes = require('./routes/medicalRecordRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/api/medical-records', medicalRecordRoutes);

module.exports = app;
