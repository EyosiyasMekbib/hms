const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const MedicalRecord = sequelize.define('MedicalRecord', {
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
    visitDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    diagnosis: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    treatment: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

module.exports = MedicalRecord;
