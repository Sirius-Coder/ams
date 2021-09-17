const appointModel = require('../../models/appointment');

module.exports.createAppointment = (req, res) => {
  const { patient_id, doctor_id, patient_name, doctor_name, date } = req.body;

  const appointment = new appointModel({
    patient_id,
    doctor_id,
    patient_name,
    doctor_name,
    date,
  });
  appointment.save(appointment, (error, docs) => {
    if (error) res.json({ success: false, msg: 'Email already exist !' });

    res.json({ success: true, msg: 'Appointment Created!' });
  });
};
