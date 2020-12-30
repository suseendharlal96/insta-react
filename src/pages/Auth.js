import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useLazyQuery, useMutation, gql } from "@apollo/client";
import Recaptcha from "react-recaptcha";
import {
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Button,
  TextField,
  makeStyles,
  Typography,
  CircularProgress,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  FormControl,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useForm } from "react-hook-form";

import { authSuccess } from "../store/actions/auth";
import "./Auth.css";

const Auth = () => {
  const useStyles = makeStyles({
    root: {
      maxWidth: "100%",
    },
    media: {
      height: "140px",
    },
    cardAction: {
      cursor: "default",
    },
  });

  const { register, errors, clearErrors, handleSubmit, getValues } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const [isSignup, setIsSignup] = useState(false);
  const [isChanged, setChanged] = useState(false);
  const [isShowPass, setShowPass] = useState(false);
  const [isVerified, setVerified] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
    name: "",
    profile: null,
  });
  const [error, setError] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
    name: "",
    profile: "",
    general: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setChanged((prevState) => !prevState);
    }, 3000);

    return () => clearInterval(interval);
  }, [isChanged]);

  const classes = useStyles();

  const [login, { loading }] = useLazyQuery(SIGNIN, {
    onCompleted(data) {
      console.log(data);
      dispatch(authSuccess(data.signin));
      history.push("/");
    },
    onError(err) {
      setError(err.graphQLErrors[0].extensions.errors);
    },
  });

  const [signup, { signuploading }] = useMutation(SIGNUP, {
    onCompleted(data) {
      console.log(data);
      dispatch(authSuccess(data.signup));
      history.push("/");
    },
    onError(err) {
      console.log(err);
      setError(err.graphQLErrors[0].extensions.errors);
    },
  });

  const formSubmit = () => {
    // e.preventDefault();
    if (isVerified) {
      setError({
        email: "",
        password: "",
        username: "",
        confirmPassword: "",
        name: "",
        general: "",
      });
      if (!isSignup) {
        login({ variables: form });
      } else {
        signup({ variables: form });
      }
    } else {
      alert("Please verify captcha");
    }
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setForm({
      ...form,
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
      name: "",
    });
    setIsSignup((prevState) => !prevState);
    clearErrors();
  };

  const callback = () => {
    console.log("captcha init");
  };
  const verifyCallback = (response) => {
    if (response) {
      setVerified(true);
      // const data = {
      //   response,
      //   secret: "6LcPNgoaAAAAANM0BBBCsRvRYB8cxrTgckb9_wmT",
      // };
      // fetch("https://www.google.com/recaptcha/api/siteverify", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Access-Control-Allow-Origin": "http://localhost:3000/auth",
      //   },
      //   mode: "cors",
      //   body: JSON.stringify(data),
      // })
      //   .then((res) => console.log(res.json()))
      //   .then((data) => {

      //     console.log(data);
      //   })
      //   .catch((error) => {
      //     console.error("Error:", error);
      //   });
    }
  };

  return (
    <main style={{ padding: "20px" }}>
      <article className="article">
        <div className="phone">
          <div className="images">
            {isChanged ? (
              <img
                className="single-pic"
                src="https://instagram.com/static/images/homepage/screenshot1.jpg/d6bf0c928b5a.jpg"
                alt=""
              />
            ) : (
              <img
                className="single-pic"
                src="https://instagram.com/static/images/homepage/screenshot5.jpg/0a2d3016f375.jpg"
                alt=""
              />
            )}
          </div>
        </div>
        <form
          onSubmit={handleSubmit(formSubmit)}
          className="form"
          noValidate
          autoComplete="off"
        >
          <Card className={classes.root}>
            <CardActionArea disableRipple className={classes.cardAction}>
              <CardMedia
                className={classes.media}
                image={process.env.PUBLIC_URL + "/insta.jpg"}
                title="Instagram"
              />
              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {error && error.general && (
                  <Typography variant="button" color="secondary" align="center">
                    {error && error.general}
                  </Typography>
                )}
                {isSignup ? (
                  <>
                    <TextField
                      autoComplete="new-password"
                      type="email"
                      required
                      onChange={handleInput}
                      fullWidth
                      margin="normal"
                      label="Email"
                      error={
                        errors.email || error.email || error.general
                          ? true
                          : false
                      }
                      inputRef={register({
                        required: true,
                        pattern: /^([0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-w]*[0-9a-zA-Z].)+[a-zA-Z]{2,9})$/,
                      })}
                      name="email"
                      variant="outlined"
                    />
                    {error && error.email ? (
                      <Typography
                        variant="caption"
                        align="center"
                        color="secondary"
                      >
                        {error.email}
                      </Typography>
                    ) : null}
                    {errors?.email?.type === "required" ? (
                      <Typography
                        variant="caption"
                        align="center"
                        color="secondary"
                      >
                        Required
                      </Typography>
                    ) : null}
                    {errors?.email?.type === "pattern" ? (
                      <Typography
                        variant="caption"
                        align="center"
                        color="secondary"
                      >
                        Invalid email
                      </Typography>
                    ) : null}
                    <TextField
                      required
                      onChange={handleInput}
                      fullWidth
                      margin="normal"
                      label="Username"
                      name="username"
                      error={
                        errors.username || error.username || error.general
                          ? true
                          : false
                      }
                      inputRef={register({ required: true })}
                      variant="outlined"
                    />
                    {error && error.username ? (
                      <Typography
                        variant="caption"
                        align="center"
                        color="secondary"
                      >
                        {error.username}
                      </Typography>
                    ) : null}
                    {errors && errors.username ? (
                      <Typography
                        variant="caption"
                        align="center"
                        color="secondary"
                      >
                        Required
                      </Typography>
                    ) : null}
                    <FormControl variant="outlined">
                      <InputLabel>Password</InputLabel>
                      <OutlinedInput
                        required
                        onChange={handleInput}
                        fullWidth
                        label="Password"
                        error={
                          errors.password || error.password || error.general
                            ? true
                            : false
                        }
                        name="password"
                        type={isShowPass ? "text" : "password"}
                        inputRef={register({ required: true, minLength: 6 })}
                        variant="outlined"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                setShowPass((prevState) => !prevState)
                              }
                              onMouseDown={() =>
                                setShowPass((prevState) => !prevState)
                              }
                              edge="end"
                            >
                              {isShowPass ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {error && error.password ? (
                        <Typography
                          variant="caption"
                          align="center"
                          color="secondary"
                        >
                          {error.password}
                        </Typography>
                      ) : null}
                      {errors?.password?.type === "required" ? (
                        <Typography
                          variant="caption"
                          align="center"
                          color="secondary"
                        >
                          Required
                        </Typography>
                      ) : null}
                      {errors?.password?.type === "minLength" ? (
                        <Typography
                          variant="caption"
                          align="center"
                          color="secondary"
                        >
                          Must be atleast 6 characters
                        </Typography>
                      ) : null}
                    </FormControl>
                    <TextField
                      required
                      onChange={handleInput}
                      fullWidth
                      margin="normal"
                      type="password"
                      error={
                        errors.confirmPassword ||
                        error.confirmPassword ||
                        error.general
                          ? true
                          : false
                      }
                      inputRef={register({
                        required: true,
                        validate: () =>
                          getValues("password") ===
                          getValues("confirmPassword"),
                      })}
                      label="Confirm Password"
                      name="confirmPassword"
                      variant="outlined"
                    />
                    {error && error.confirmPassword ? (
                      <Typography
                        variant="caption"
                        align="center"
                        color="secondary"
                      >
                        {error.confirmPassword}
                      </Typography>
                    ) : null}
                    {errors?.confirmPassword?.type === "required" ? (
                      <Typography
                        variant="caption"
                        align="center"
                        color="secondary"
                      >
                        Required
                      </Typography>
                    ) : null}
                    {errors?.confirmPassword?.type === "validate" ? (
                      <Typography
                        variant="caption"
                        align="center"
                        color="secondary"
                      >
                        Passwords do not match
                      </Typography>
                    ) : null}
                    <Typography
                      color={
                        (errors && errors.profile) || (error && error.profile)
                          ? "secondary"
                          : "initial"
                      }
                    >
                      Profile image *
                    </Typography>
                    <input
                      type="file"
                      name="profile"
                      ref={register({ required: true })}
                      onChange={(e) =>
                        setForm({ ...form, profile: e.target.files[0] })
                      }
                    />
                    {errors?.profile?.type === "required" ? (
                      <Typography
                        variant="caption"
                        align="center"
                        color="secondary"
                      >
                        Please upload a profile image
                      </Typography>
                    ) : null}
                  </>
                ) : (
                  <>
                    <TextField
                      required
                      onChange={handleInput}
                      fullWidth
                      margin="normal"
                      label="Username or Email"
                      name="name"
                      variant="outlined"
                      autoComplete="off"
                      inputRef={register({ required: true })}
                      error={
                        (errors && errors.name) || error.name || error.general
                          ? true
                          : false
                      }
                    />

                    {error && error.username ? (
                      <Typography
                        variant="caption"
                        align="center"
                        color="secondary"
                      >
                        {error.username}
                      </Typography>
                    ) : null}
                    {errors && errors.name ? (
                      <Typography
                        variant="caption"
                        align="center"
                        color="secondary"
                      >
                        Required
                      </Typography>
                    ) : null}
                    <FormControl variant="outlined">
                      <InputLabel required={true}>Password</InputLabel>
                      <OutlinedInput
                        onChange={handleInput}
                        fullWidth
                        autoComplete="off"
                        label="Password"
                        name="password"
                        inputRef={register({ required: true })}
                        type={isShowPass ? "text" : "password"}
                        variant="outlined"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                setShowPass((prevState) => !prevState)
                              }
                              onMouseDown={() =>
                                setShowPass((prevState) => !prevState)
                              }
                              edge="end"
                            >
                              {isShowPass ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                        error={
                          (errors && errors.password) ||
                          error.password ||
                          error.general
                            ? true
                            : false
                        }
                      />
                      {errors && errors.password ? (
                        <Typography
                          variant="caption"
                          align="center"
                          color="secondary"
                        >
                          Required
                        </Typography>
                      ) : null}
                    </FormControl>
                  </>
                )}
                <Recaptcha
                  sitekey="6LcPNgoaAAAAAEFWyM6lEzfGdD4IATuAsT8j3h5C"
                  render="explicit"
                  verifyCallback={verifyCallback}
                  onloadCallback={callback}
                />
                <Button
                  disabled={
                    loading || signuploading || Object.keys(errors).length !== 0
                  }
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "10px" }}
                >
                  {isSignup ? "Signup" : "Login"}
                </Button>
                {(loading || signuploading) && (
                  <CircularProgress
                    style={{
                      position: "relative",
                      left: "45%",
                      bottom: "35px",
                    }}
                    size={30}
                  />
                )}
              </CardContent>
            </CardActionArea>
          </Card>
          <Card style={{ marginTop: "10px" }}>
            <CardActionArea disableRipple className={classes.cardAction}>
              <CardContent>
                <Typography>
                  {isSignup
                    ? "Already have an account?"
                    : "Dont have an account?"}

                  <strong onClick={switchMode} style={{ color: "#0000ff" }}>
                    {isSignup ? "Signin" : "Signup"}
                  </strong>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </form>
      </article>
    </main>
  );
};

const SIGNUP = gql`
  mutation signin(
    $email: String!
    $username: String!
    $password: String!
    $confirmPassword: String!
    $profile: Upload!
  ) {
    signup(
      email: $email
      password: $password
      confirmPassword: $confirmPassword
      username: $username
      profile: $profile
    ) {
      token
      id
      username
      profile
    }
  }
`;

const SIGNIN = gql`
  query signin($name: String!, $password: String!) {
    signin(name: $name, password: $password) {
      token
      id
      username
      profile
    }
  }
`;

export default Auth;
