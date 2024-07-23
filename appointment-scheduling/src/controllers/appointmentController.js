const Appointment = require('../models/Appointment');
const jwt = require('jsonwebtoken');

const axios = require('axios');

exports.createAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.create(req.body);
        console.log(appointment);

        // Fetch user using user id
        const userResponse = await axios.get(`http://localhost/user-management/api/users/${appointment.userId}`);
        const user = userResponse.data;


        // Send notification
        const notification = {
            message: `You have scheduled an appointment with Dr.Bekele Admasu on ${appointment.appointmentDate}`,
            to_email: user.email,
        };

        try {
            await axios.post('http://localhost:8080/send', notification);
        } catch (notificationError) {
            console.error('Failed to send notification:', notificationError.message);
        }

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
