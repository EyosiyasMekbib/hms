const express = require('express');
const { createMedicalRecord, getMedicalRecords } = require('../controllers/medicalRecordController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', auth, createMedicalRecord);
router.get('/', auth, getMedicalRecords);

module.exports = router;
