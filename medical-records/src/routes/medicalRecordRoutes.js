const express = require('express');
const { createMedicalRecord, getMedicalRecords, getMedicalRecordsByPatientId } = require('../controllers/medicalRecordController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', auth, createMedicalRecord);
router.get('/', auth, getMedicalRecords);
router.get('/patient/:patientId', auth, getMedicalRecordsByPatientId);

module.exports = router;
