import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { gql, useMutation } from "@apollo/client";
import FileUpload from "react-file-base64";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";

import { postSuccess } from "../../store/actions/post";

const PostForm = ({ open, handleClose, postSuccess }) => {
  const [form, setForm] = useState({ title: "", image: "" });
  const [error, setError] = useState({ title: "", image: "" });
  const { register, handleSubmit, clearErrors, errors } = useForm();
  const [formSubmit, { loading }] = useMutation(CREATE_POST, {
    onCompleted(data) {
      console.log(data);
      postSuccess(data.createPost);
      close();
    },
    onError(err) {
      setError(err.graphQLErrors[0].extensions.errors);
    },
  });
  const close = () => {
    clearErrors();
    handleClose();
    setForm({ ...error, title: "", image: "" });
    setError({ ...error, title: "", image: "" });
  };
  return (
    <Dialog
      fullWidth={true}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <form
        onSubmit={handleSubmit(() => formSubmit({ variables: form }))}
        noValidate
      >
        <DialogTitle id="responsive-dialog-title">New Post</DialogTitle>
        <DialogContent>
          <TextField
            autoComplete="off"
            variant="outlined"
            fullWidth
            required
            name="title"
            label="Title"
            error={
              (errors && errors.title) || (error && error.title) ? true : false
            }
            inputRef={register({ required: true })}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          {errors && errors.title && (
            <Typography variant="body1" color="secondary" align="center">
              Required
            </Typography>
          )}
          {error && error.title && (
            <Typography variant="body1" color="secondary" align="center">
              {error.title}
            </Typography>
          )}
          <Typography color={error && error.image ? "secondary" : "initial"}>
            Snapshot *
          </Typography>
          {form?.image && (
            <img
              src={form?.image}
              alt="post-image"
              style={{ width: "100px", height: "100px" }}
            />
          )}
          <FileUpload
            multiple={false}
            onDone={({ base64 }) => setForm({ ...form, image: base64 })}
          />
          {error && error.image && (
            <Typography variant="body1" color="secondary" align="center">
              {error.image}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} autoFocus onClick={close} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={loading}
            color="primary"
            type="submit"
          >
            {loading ? "Hold on" : "Create"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const mapDispatchToProps = (dispatch) => ({
  postSuccess: (data) => dispatch(postSuccess(data)),
});

const CREATE_POST = gql`
  mutation createPost($title: String!, $image: String!) {
    createPost(title: $title, image: $image) {
      id
      image
      userId
      title
      likes
      comments {
        user
        comment
      }
    }
  }
`;

export default connect(null, mapDispatchToProps)(PostForm);
