const express = require('express');
const { createPrescription, getPrescriptions } = require('../controllers/prescriptionController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', auth, createPrescription);
router.get('/', auth, getPrescriptions);

module.exports = router;
