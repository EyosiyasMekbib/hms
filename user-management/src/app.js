const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const app = express();

// Configure CORS
app.use(cors());

app.use(bodyParser.json());

app.use('/api/users', userRoutes);

module.exports = app;
