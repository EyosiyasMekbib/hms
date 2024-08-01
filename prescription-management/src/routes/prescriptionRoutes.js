const express = require('express');
const { createPrescription, getPrescriptions, getPrescriptionByMedicalRecordId } = require('../controllers/prescriptionController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', auth, createPrescription);
router.get('/', auth, getPrescriptions);
router.get('/medical-record/:medicalRecordId', auth, getPrescriptionByMedicalRecordId)

module.exports = router;
