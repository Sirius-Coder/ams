import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Grid,
  CircularProgress,
  Button,
  AppBar,
  Toolbar,
  Select,
  Paper,
  MenuItem,
  Divider,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';

const useStyles = makeStyles(() => ({
  loaderview: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function Dashboard() {
  const classes = useStyles();
  const history = useHistory();
  const [view, setView] = useState('loading');
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const init = async () => {
      const authenticate = await axios.get('/auth/authenticate');
      if (authenticate.data.success === true) {
        setView('logged');
        setUserInfo(authenticate.data);
      } else setView('fail');
    };

    init();
  }, []);

  const logout = () => {
    axios
      .get('/auth/logout')
      .then(() => {
        history.push('/');
      })
      .catch((e) => console.error(e));
  };

  if (view === 'logged')
    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              background: '#FF4733',
            }}
          >
            <h2>
              Welcome to the Dashboard , {userInfo.role} {userInfo.name}{' '}
            </h2>
            <Button color='inherit' onClick={logout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <div>
          {userInfo.role === 'Admin' && <AdminView id={userInfo.id} />}
          {userInfo.role === 'Doctor' && <DoctorView id={userInfo.id} />}
          {userInfo.role === 'Patient' && (
            <PatientView id={userInfo.id} name={userInfo.name} />
          )}
        </div>
      </div>
    );

  if (view === 'fail')
    return (
      <div className={classes.loaderview}>
        <h1>
          You are not authenticated .{' '}
          <Link
            to='/'
            style={{ outline: 'none', color: 'blue', textDecoration: 'none' }}
          >
            Click here
          </Link>{' '}
          to login again
        </h1>
      </div>
    );

  if (view === 'loading')
    return (
      <div className={classes.loaderview}>
        <CircularProgress />
      </div>
    );
}

const AdminView = () => {
  return <Grid container>This is the Admin View</Grid>;
};

const DoctorView = (props) => {
  const [appointment, setAppointment] = useState([]);
  useEffect(() => {
    const init = async () => {
      const res = await axios.get(
        `/appointment/getAppointments/doctor/${props.id}`
      );
      setAppointment(res.data.data);
    };
    init();
  }, []);

  const deleteApp = (id) => {
    axios.delete(`/appointment/delete/${id}`).then((res) => {
      setAppointment(appointment.filter((app) => app._id != id));
    });
  };

  return (
    <Grid container style={{ padding: '1em' }}>
      <Grid item xs={12} align='center'>
        <h3>My Appointments</h3>
      </Grid>
      <Grid xs={12} align='center'>
        <Grid container style={{ padding: '2em', width: '50%' }}>
          {appointment.length > 0 &&
            appointment.map((app) => (
              <Grid item xs align='center'>
                <Paper elevation={4}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <h4>Patient Name : {app.patient_name}</h4>
                    </Grid>
                    <Grid item xs={12}>
                      <h4>Date : {app.date.slice(0, 9)}</h4>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        onClick={() => {
                          deleteApp(app._id);
                        }}
                      >
                        Delete Appointment
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          {appointment.length == 0 && (
            <Grid item xs={12} align='center'>
              <h5>You have no appointments </h5>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

const PatientView = (props) => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [date, setDate] = useState('');
  useEffect(() => {
    const init = async () => {
      const resp = await axios.get('/user/getDoctors');
      setDoctors(resp.data.data);
    };
    init();
  }, []);
  const createAppointment = () => {
    axios
      .post('/appointment/create', {
        patient_id: props.id,
        patient_name: props.name,
        doctor_id: selectedDoctor,
        doctor_name: doctors.filter((doctor) => doctor._id == selectedDoctor)[0]
          .name,
        date: new Date(date),
      })
      .then((res) => {
        setSelectedDoctor('');
        setDate('');
      });
  };
  return (
    <Grid container style={{ padding: '1em' }} spacing={2}>
      {doctors.length > 0 && (
        <>
          <Grid item xs={12} align='center'>
            <h3>Book an Appointment</h3>
          </Grid>
          <Grid item xs={12} align='center'>
            <h4>Select a Doctor:</h4>
          </Grid>
          <Grid item xs={12} align='center'>
            <Select
              size='small'
              style={{ width: '15%' }}
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
            >
              {doctors.map((doctor, id) => (
                <MenuItem key={doctor._id} value={doctor._id}>
                  {doctor.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} align='center'>
            <h4>Select Date:</h4>
          </Grid>
          <Grid item xs={12} align='center'>
            <input
              type='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} align='center'>
            <Button variant='contained' onClick={createAppointment}>
              Create Appointment
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Dashboard;
