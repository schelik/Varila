import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Logo from './Logo.png';
import Alert from '@material-ui/lab/Alert';
import { useSelector, useDispatch, } from "react-redux";
import { login } from '../features/authSlice';
import { useHistory } from "react-router-dom"
const axios = require('axios');


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Varila
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(9),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorFname, setErrorfname] = useState("");
  const [errorLname, setErrorlname] = useState("");
  const [errorEmail, setErroremail] = useState("");
  const [errorPassword, setErrorpassword] = useState("");
  const [authError, setAutherror] = useState("");
  const dispatch = useDispatch();
  let history = useHistory();

  const submitPressed = (e) => {
    if(email === "" || password === "" || fname === "" || lname === ""){
      e.preventDefault();
      if(email === ""){
        setErroremail("true");
      }
      if(password === ""){
        setErrorpassword("true");
      }
      if(fname === ""){
        setErrorfname("true");
      }
      if(lname === ""){
        setErrorlname("true");
      }
      setAutherror("Fields are required");
    }
    else{
      axios.post('http://localhost:5000/api/signup', {
          fname: fname,
          lname: lname,
          email: email,
          password: password  
      }).then(res => {
          dispatch(login(res?.data.accessToken));
          history.push("/doc/1");})
        .catch(err => setAutherror(err.response.data.error));
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={Logo} alt=""/>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
            <Box mb={2} >
              {authError && (
              <Alert severity="error" onClick={() => setAutherror(null)}>
              {authError}
              </Alert>)} 
            </ Box>
          <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={fname}
                  error={errorFname === "true" ? true : false}
                  onChange={ (e) => setFname(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={lname}
                  error={errorLname === "true" ? true : false}
                  onChange={ (e) => setLname(e.target.value)}
                />
              </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                error={errorEmail === "true" ? true : false}
                onChange={ (e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                error={errorPassword === "true" ? true : false}
                onChange={ (e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={e => submitPressed(e)}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/login" variant="body2">
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}