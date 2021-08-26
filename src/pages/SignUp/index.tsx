import React, { useContext, useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Routes } from "../../configuration";
import { useHistory } from "react-router-dom";
import ServicesContext, { Context } from "../../services/ServicesContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const emailValidationString =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default () => {
  const classes = useStyles();
  const [email, setEmail] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");
  const [repeatedPassword, setRepeatedPassword] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>();
  const history = useHistory();
  const accountService = useContext<Context>(ServicesContext).accountService;

  const isDisabled = (): boolean => {
    const canSubmit =
      email && password && password === repeatedPassword && error === undefined;
    if (canSubmit) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const result = await accountService.signUp(email!, password!, repeatedPassword!);
    if (result !== null) {
      setError(result);
      return;
    }

    history.push(Routes.home);
  };

  useEffect(() => {
    validateEmail(email);
  }, [email]);

  useEffect(() => {
    validatePassword(password, repeatedPassword);
  }, [password, repeatedPassword]);

  const handleInputEmail = (inputEmail: string) => {
    setEmail(inputEmail);
    setError(undefined);
  };

  function validateEmail(inputEmail: string | undefined) {
    if (inputEmail === "")
      return;

    if (inputEmail === undefined) {
      setError(emailError);
      return;
    }

    const validationResult = emailValidationString.test(String(inputEmail).toLowerCase());
    
    if (!validationResult) {
      setError(emailError);
      return;
    }
  }

  const validatePassword = (password: string | undefined, repeatedPassword: string | undefined) => {
    if (password === undefined || repeatedPassword === undefined || password !== repeatedPassword) {
      setError(passwordError);
    } else {
      setError(undefined);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={(e) => handleInputEmail(e.target.value)}
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={(e) => setRepeatedPassword(e.target.value)}
                name="repeatpassword"
                label="Repeat Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isDisabled()}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              {error && (
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  color="error"
                >
                  {error}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

const emailError = "Email is invalid.";
const passwordError = "Passwords are different";