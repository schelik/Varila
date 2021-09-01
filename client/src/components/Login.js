import React, { useState, useEffect } from 'react';
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
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErroremail] = useState("");
  const [errorPassword, setErrorpassword] = useState("");
  const [authError, setAutherror] = useState("");
  const dispatch = useDispatch();
  let history = useHistory();

  const submitPressed = (e) => { 
    // console.log(useSelector((state) => state.auth.authKey)); 
    if(email === "" || password === ""){
        if(email === ""){
            setErroremail("true");
        }
        if(password === ""){
            setErrorpassword("true");
        }
        setAutherror("Fields are required");
    }
    else{
        axios.post('http://localhost:5000/api/login', {
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
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          {authError && (
          <Alert severity="error" onClick={() => setAutherror(null)}>
          {authError}
          </Alert>)}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            error={errorEmail === "true" ? true : false}
            onChange={ (e) => setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
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
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={e => submitPressed(e)}
          >
            Sign In
          </Button>
          <Grid container justifyContent="center">
            <Grid item >
              <Link href="/" variant="body2" >
                {"Don't have an account? Sign Up"}
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