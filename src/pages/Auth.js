import React, { useState, useEffect } from "react";
import { useLazyQuery, useMutation, gql } from "@apollo/client";
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

  const { register, errors, clearErrors, handleSubmit } = useForm();

  const [isSignup, setIsSignup] = useState(false);
  const [isChanged, setChanged] = useState(false);
  const [isShowPass, setShowPass] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
    name: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
    name: "",
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
    },
    onError(err) {
      setError(err.graphQLErrors[0].extensions.errors);
    },
  });

  const formSubmit = () => {
    // e.preventDefault();
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
      return;
    }
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
        <form onSubmit={handleSubmit(formSubmit)} className="form" noValidate>
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
                {/* {errors && errors.general && (
                  <caption style={{ color: "#ff0000", textAlign: "center" }}>
                    {errors && errors.general}
                  </caption>
                )} */}
                {isSignup ? (
                  <>
                    <TextField
                      required
                      onChange={handleInput}
                      fullWidth
                      margin="normal"
                      id="outlined-basic"
                      label="Email"
                      name="email"
                      variant="outlined"
                    />
                    <TextField
                      required
                      onChange={handleInput}
                      fullWidth
                      margin="normal"
                      id="outlined-basic"
                      label="Username"
                      name="username"
                      variant="outlined"
                    />
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        required
                        onChange={handleInput}
                        fullWidth
                        margin="normal"
                        id="outlined-basic"
                        label="Password"
                        name="password"
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
                      />
                    </FormControl>
                    <TextField
                      required
                      onChange={handleInput}
                      fullWidth
                      margin="normal"
                      id="outlined-basic"
                      label="Confirm Password"
                      name="confirmPassword"
                      variant="outlined"
                    />
                  </>
                ) : (
                  <>
                    <TextField
                      required
                      onChange={handleInput}
                      fullWidth
                      margin="normal"
                      id="outlined-basic"
                      label="Username or Email"
                      name="name"
                      variant="outlined"
                      autoComplete="false"
                      inputRef={register({ required: true })}
                      error={errors.name ? true : false}
                    />
                    {errors && errors.name ? (
                      <p
                        style={{
                          color: "#ff0000",
                          padding: "5px",
                          textAlign: "center",
                        }}
                      >
                        Required
                      </p>
                    ) : null}
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        required
                        onChange={handleInput}
                        fullWidth
                        autoComplete="false"
                        margin="normal"
                        id="outlined-basic"
                        label="Password"
                        name="password"
                        inputRef={register({ required: true, minLength: 6 })}
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
                        error={errors.password ? true : false}
                      />
                      {errors.password ? (
                        <p
                          style={{
                            color: "#ff0000",
                            textAlign: "center",
                            padding: "5px",
                          }}
                        >
                          Required and must be atleast 6 characters
                        </p>
                      ) : null}
                    </FormControl>
                  </>
                )}
                <Button
                  disabled={loading}
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "10px" }}
                >
                  {isSignup ? "Signup" : "Login"}
                </Button>
                {loading && (
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

                  <strong
                    onClick={() => setIsSignup((prevState) => !prevState)}
                    style={{ color: "#0000ff" }}
                  >
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

const SIGNIN = gql`
  query signin($name: String!, $password: String!) {
    signin(name: $name, password: $password) {
      token
      id
      username
    }
  }
`;

export default Auth;
