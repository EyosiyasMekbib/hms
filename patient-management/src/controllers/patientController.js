const Patient = require('../models/Patient');

exports.createPatient = async (req, res) => {
    const { firstName, lastName, dateOfBirth, gender, address, phoneNumber } = req.body;
    try {
        const patient = await Patient.create({ firstName, lastName, dateOfBirth, gender, address, phoneNumber });
        res.status(201).json(patient);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create patient' });
    }
};

exports.getPatients = async (req, res) => {
    try {
        const patients = await Patient.findAll();
        res.status(200).json(patients);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve patients' });
    }
};

exports.getPatientById = async (req, res) => {
    const { id } = req.params;
    try {
        const patient = await Patient.findByPk(id);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.status(200).json(patient);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve patient' });
    }
};

exports.updatePatient = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, dateOfBirth, gender, address, phoneNumber } = req.body;
    try {
        const patient = await Patient.findByPk(id);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        patient.firstName = firstName;
        patient.lastName = lastName;
        patient.dateOfBirth = dateOfBirth;
        patient.gender = gender;
        patient.address = address;
        patient.phoneNumber = phoneNumber;
        await patient.save();
        res.status(200).json(patient);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update patient' });
    }
};

exports.deletePatient = async (req, res) => {
    const { id } = req.params;
    try {
        const patient = await Patient.findByPk(id);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        await patient.destroy();
        res.status(204).json({ message: 'Patient deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete patient' });
    }
};
