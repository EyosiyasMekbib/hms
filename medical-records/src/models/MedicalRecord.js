const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const MedicalRecord = sequelize.define('MedicalRecord', {
    patientId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    doctorId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    visitDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    diagnosis: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    treatment: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

module.exports = MedicalRecord;
