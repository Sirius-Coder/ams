import React, { useState } from 'react';
import {
  Grid,
  Grow,
  TextField,
  Button,
  Paper,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: 'border-box',
    backgroundColor: '#bc1800',
    height: '100vh',
  },
  header: {
    background: 'white',
    padding: '1em',
  },
  main: {
    margin: '3em auto',
    width: '40%',
    padding: '1em',
    // [theme.breakpoints.down('sm')]: {
    //   width: '80%',
    // },
  },
  input: {
    width: '40%',
    // [theme.breakpoints.down('sm')]: {
    //   width: '75%',
    // },
  },
}));

export default function Signup() {
  const classes = useStyles();
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  //Create user
  const signup = () => {
    axios
      .post('/auth/createUser', { name, email, password, role: accountType })
      .then((res) => {
        if (res.data.success) history.push('/');
        else setErrorMsg('E-mail already exist');
      })
      .catch((e) => console.error(e));
  };

  return (
    <div className={classes.root}>
      <Grid container alignItems='center' className={classes.header}>
        <Grid item xs={8}>
          <h1>Application Management System</h1>
        </Grid>
        <Grid item xs={4} align='center'>
          <h1>Made with ❤ in JS</h1>
        </Grid>
      </Grid>
      <Grow in={true} timeout={900}>
        <Paper elevation={15} className={classes.main}>
          <Grid container alignItems='center' spacing={3}>
            <Grid
              item
              xs={12}
              align='center'
              style={{ fontFamily: 'Montserrat', fontSize: '1.2em' }}
            >
              <h1>Create Account</h1>
            </Grid>
            <Grid item xs={12} align='center'>
              <TextField
                variant='outlined'
                autoComplete
                type='text'
                size='small'
                required
                label='Enter your Name'
                className={classes.input}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} align='center'>
              <TextField
                variant='outlined'
                autoComplete
                type='email'
                size='small'
                required
                label='Enter your E-mail'
                className={classes.input}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} align='center'>
              <TextField
                variant='outlined'
                type='password'
                size='small'
                label='Enter Password'
                required
                className={classes.input}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} align='center'>
              <InputLabel id='demo-simple-select-label'>Select Role</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                size='small'
                value={accountType}
                label='Select Role '
                onChange={(e) => setAccountType(e.target.value)}
                style={{ width: '15%' }}
              >
                <MenuItem value={'Admin'}>Admin</MenuItem>
                <MenuItem value={'Doctor'}>Doctor</MenuItem>
                <MenuItem value={'Patient'}>Patient</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} align='center'>
              <Button
                variant='text'
                onClick={signup}
                disabled={
                  !name.length ||
                  !email.length ||
                  !password.length ||
                  !accountType.length
                }
              >
                {' '}
                Signup
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              align='center'
              style={{ fontFamily: 'Montserrat', color: 'red' }}
            >
              <p>{errorMsg}</p>
            </Grid>
            <Grid item xs={12}>
              <h4>
                Already have an account{' '}
                <span>
                  <Link to='/'>Click here</Link>
                </span>{' '}
              </h4>
            </Grid>
          </Grid>
        </Paper>
      </Grow>
    </div>
  );
}
