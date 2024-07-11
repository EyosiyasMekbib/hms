const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    medication: {
        type: String,
        required: true,
    },
    dosage: {
        type: String,
        required: true,
    },
    frequency: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model('Prescription', PrescriptionSchema);
