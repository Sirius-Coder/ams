const express = require('express');
const authRouter = express.Router();

const { createUser } = require('../controllers/authControllers/createUser');
const { userLogin } = require('../controllers/authControllers/userLogin');
const {
  authenticateUser,
} = require('../controllers/authControllers/authenticateUser');
const { logoutUser } = require('../controllers/authControllers/logoutUser');

//Create a new User
authRouter.post('/createUser', createUser);

//User Login
authRouter.post('/login', userLogin);

//Authenticate the Dashboard
authRouter.get('/authenticate', authenticateUser);

//Logout the User
authRouter.get('/logout', logoutUser);

module.exports = authRouter;
