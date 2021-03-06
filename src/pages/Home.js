import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import PostForm from "../components/PostForm/PostForm";
import Post from "../components/Posts/Post";

const Home = ({ authData }) => {
  const useStyles = makeStyles(() => ({
    appBar: {
      top: "auto",
      bottom: 0,
    },
    grow: {
      flexGrow: 1,
    },
    fabButton: {
      position: "absolute",
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: "0 auto",
    },
  }));
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const history = useHistory();

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  return (
    <>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar style={{}}>
          {!authData ? (
            <Fab
              className={classes.fabButton}
              component={Link}
              to="/auth"
              color="secondary"
            >
              <AddIcon />
            </Fab>
          ) : (
            <Fab
              onClick={handleClickOpen}
              color="secondary"
              aria-label="add"
              className={classes.fabButton}
            >
              <AddIcon />
            </Fab>
          )}
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
      <div
        style={{
          padding: "0px 20px",
          height: "450px",
          overflow:'auto',
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Post />
      </div>
      <PostForm open={open} handleClose={handleClose} />
    </>
  );
};

const mapStateToProps = (state) => ({
  authData: state?.authReducer?.authData,
});

export default connect(mapStateToProps)(Home);
