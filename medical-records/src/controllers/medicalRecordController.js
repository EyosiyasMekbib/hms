const MedicalRecord = require('../models/MedicalRecord');
const jwt = require('jsonwebtoken');

exports.createMedicalRecord = async (req, res) => {
    try {
        const medicalRecord = await MedicalRecord.create(req.body);
        res.status(201).json(medicalRecord);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create medical record' });
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
