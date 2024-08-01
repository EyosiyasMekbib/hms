const MedicalRecord = require('../models/MedicalRecord');
const jwt = require('jsonwebtoken');

exports.createMedicalRecord = async (req, res) => {
    try {
        console.log(req.body)
        const medicalRecord = await MedicalRecord.create(req.body);
        res.status(201).json(medicalRecord);
    } catch (err) {
        res.status(500).json({ error: `Failed to create medical record ${err}` });
    }
};

exports.getMedicalRecords = async (req, res) => {
    try {
        const medicalRecords = await MedicalRecord.findAll();
        res.status(200).json(medicalRecords);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve medical records' });
    }
};

exports.getMedicalRecordsByPatientId = async (req, res) => {
    try {
        const { patientId } = req.params;
        const medicalRecords = await MedicalRecord.findAll({
            where: {
                patientId: patientId
            }
        });
        if (medicalRecords.length === 0) {
            return res.status(404).json({ error: 'No medical records found for this patient ID' });
        }
        res.status(200).json(medicalRecords);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve medical records' });
    }
};