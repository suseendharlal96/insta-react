import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";

import { logout } from "../../store/actions/auth";

const Navbar = ({ authData }) => {
  console.log(authData);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
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
              onClick={() => dispatch(logout())}
            >
              Logout
            </Button>
          </>
        ) : (
          location.pathname !== "/auth" && (
            <Button
              color="secondary"
              variant="contained"
              onClick={() => history.push("/auth")}
            >
              Login
            </Button>
          )
        )}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  authData: state?.authReducer?.authData,
});

export default connect(mapStateToProps)(Navbar);
