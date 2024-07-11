const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Appointment = sequelize.define('Appointment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    patientId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    doctorId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    appointmentDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Scheduled',
    },
});

module.exports = Appointment;
