const express = require('express');
const appointmentRouter = express.Router();

const {
  createAppointment,
} = require('../controllers/appointmentController/createAppointment');
const {
  editAppointment,
} = require('../controllers/appointmentController/editAppointment');
const {
  deleteAppointment,
} = require('../controllers/appointmentController/deleteAppointment');
const {
  getDoctorAppointment,
  getPatientAppointment,
} = require('../controllers/appointmentController/getAppointments');

//Create an Appointment
appointmentRouter.post('/create', createAppointment);

//Edit an Appointment
appointmentRouter.post('/edit/:id', editAppointment);

//Delete an Appointment
appointmentRouter.delete('/delete/:id', deleteAppointment);

//Get All appointment for a Doctor
appointmentRouter.get('/getAppointments/doctor/:id', getDoctorAppointment);

//Get All appointments for a Patient
appointmentRouter.get('/getAppointment/paitent/:id', getPatientAppointment);

module.exports = appointmentRouter;
