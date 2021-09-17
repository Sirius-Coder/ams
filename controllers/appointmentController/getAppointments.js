const appointModel = require('../../models/appointment');
const mongoose = require('mongoose');
const { Types } = mongoose;

module.exports.getPatientAppointment = (req, res) => {
  appointModel.find(
    { patient_id: Types.ObjectId(req.params.id) },
    (err, docs) => {
      if (err) throw err;

      res.json({
        success: true,
        data: docs,
      });
    }
  );
};

module.exports.getDoctorAppointment = (req, res) => {
  appointModel.find(
    { doctor_id: Types.ObjectId(req.params.id) },
    (err, docs) => {
      if (err) throw err;

      res.json({
        success: true,
        data: docs,
      });
    }
  );
};
