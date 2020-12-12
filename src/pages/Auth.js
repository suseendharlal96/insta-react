import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Button,
  TextField,
  makeStyles,
  Typography,
} from "@material-ui/core";

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

  const [isSignup, setIsSignup] = useState(false);
  const [isChanged, setChanged] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setChanged((prevState) => !prevState);
    }, 3000);

    return () => clearInterval(interval);
  }, [isChanged]);

  const classes = useStyles();

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
        <div className="form">
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
                {isSignup ? (
                  <>
                    <TextField
                      fullWidth
                      margin="normal"
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      id="outlined-basic"
                      label="Username"
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      id="outlined-basic"
                      label="Password"
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      id="outlined-basic"
                      label="Confirm Password"
                      variant="outlined"
                    />
                  </>
                ) : (
                  <>
                    <TextField
                      fullWidth
                      margin="normal"
                      id="outlined-basic"
                      label="Username or Email"
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      id="outlined-basic"
                      label="Password"
                      variant="outlined"
                    />
                  </>
                )}
                <Button variant="contained" color="primary">
                  {isSignup ? "Signup" : "Login"}
                </Button>
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
        </div>
      </article>
    </main>
  );
};

export default Auth;
