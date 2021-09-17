const appointModel = require('../../models/appointment');

module.exports.deleteAppointment = (req, res) => {
  const { patient_id, doctor_id, patient_name, doctor_name, date } = req.body;

  appointModel.findByIdAndDelete(req.params.id, (err, docs) => {
    if (err) throw err;

    res.json({
      success: true,
      msg: 'Appointment Deleted!',
    });
  });
};
