const express = require('express');
const { createPatient, getPatients, getPatientById, updatePatient, deletePatient } = require('../controllers/patientController');
const auth = require('../middleware/authMiddleware'); // Assuming you have auth middleware
const roleMiddleware = require('../middleware/roleMiddleware'); // Assuming you have role middleware

const router = express.Router();

router.post('/', auth, roleMiddleware(['admin', 'doctor']), createPatient);
router.get('/', auth, roleMiddleware(['admin', 'doctor', 'nurse']), getPatients);
router.get('/:id', auth, roleMiddleware(['admin', 'doctor', 'nurse']), getPatientById);
router.put('/:id', auth, roleMiddleware(['admin', 'doctor']), updatePatient);
router.delete('/:id', auth, roleMiddleware(['admin']), deletePatient);

module.exports = router;
