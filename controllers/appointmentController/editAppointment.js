const appointModel = require('../../models/appointment');

module.exports.editAppointment = (req, res) => {
  const { patient_id, doctor_id, patient_name, doctor_name, date } = req.body;

  appointModel.findByIdAndUpdate(
    req.params.id,
    { date: new Date(req.body.date) },
    (err, docs) => {
      if (err) throw err;

      res.json({
        success: true,
        msg: 'Appointment Changed!',
      });
    }
  );
};
