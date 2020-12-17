import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";

const Navbar = ({ authData }) => {
  console.log(authData)
  const history = useHistory();
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  }));
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Instagram</Typography>
        {authData ? (
          <>
            <Typography variant="h6">{authData.username}</Typography>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => history.push("/auth")}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            color="secondary"
            variant="contained"
            onClick={() => history.push("/auth")}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  authData: state?.authReducer?.authData,
});

export default connect(mapStateToProps)(Navbar);
