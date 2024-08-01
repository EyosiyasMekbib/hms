const Prescription = require('../models/Prescription');

exports.createPrescription = async (req, res) => {
    try {
        const prescription = new Prescription(req.body);
        await prescription.save();
        res.status(201).json(prescription);
    } catch (err) {
        res.status(500).json({ error: `Failed to create prescription ${err}` });
    }
};

exports.getPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find();
        res.status(200).json(prescriptions);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve prescriptions' });
    }
};

exports.getPrescriptionByMedicalRecordId = async (req, res) => {
    try {
        const medicalRecordId = req.params.medicalRecordId;
        const prescriptions = await Prescription.find({ medicalRecordId });
        res.status(200).json(prescriptions);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve prescriptions' });
    }
};