const Appointment = require('../models/Appointment');
const jwt = require('jsonwebtoken');

exports.createAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.create(req.body);
        console.log(appointment);
        res.status(201).json(appointment);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to create appointment' });
    }
};

exports.getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAll();
        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve appointments' });
    }
};
