const express = require('express');
const userRouter = express.Router();

const { editDoctor } = require('../controllers/userControllers/editDoctor');
const { editPatient } = require('../controllers/userControllers/editPatient');
const {
  getAllUsers,
  getDoctors,
} = require('../controllers/userControllers/getAllUsers');

//Edit Doctor Info -- Only Name
userRouter.post('/editDoctor/:id', editDoctor);

//Edit Patient Info -- Only Name
userRouter.post('/editPatient/:id', editPatient);

//Get All Doctors and Patients for Admin
userRouter.get('/getAllUsers', getAllUsers);

//Get All Doctors for booking appointment
userRouter.get('/getDoctors', getDoctors);

module.exports = userRouter;
