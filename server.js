const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
var connectDB = require('./config/db');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const appointmentRouter = require('./routes/appointment');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
//Loading up the environment variable file
dotenv.config({ path: './Config/config.env' });

//Loading Up the Static Files
app.use(express.static(path.join(__dirname, 'client', 'build')));

//Using our Routes
app.use('/auth/', authRouter);
app.use('/user/', userRouter);
app.use('/appointment/', appointmentRouter);
//Firing up our database
connectDB();

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
//Firing up our server
app.listen(PORT, () => {
  console.log('The server is running succesfully');
});
