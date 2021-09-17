const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient_id: {
    type: mongoose.ObjectId,
  },
  doctor_id: {
    type: mongoose.ObjectId,
  },
  patient_name: {
    type: String,
  },
  doctor_name: {
    type: String,
  },
  date: {
    type: Date,
  },
});

const appointmentModel = mongoose.model('appointments', appointmentSchema);

module.exports = appointmentModel;
