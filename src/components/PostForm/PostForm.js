import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { gql, useMutation } from "@apollo/client";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";

import { postSuccess } from "../../store/actions/post";

const PostForm = ({ open, handleClose, postSuccess }) => {
  const [form, setForm] = useState({ title: "", file: null });
  const [error, setError] = useState({ title: "", file: "" });
  const { register, handleSubmit, clearErrors, errors, getValues } = useForm();
  const [formSubmit, { loading }] = useMutation(CREATE_POST, {
    onCompleted(data) {
      console.log(data);
      postSuccess(data.createPost);
      close();
    },
    onError(err) {
      console.log(err);
      setError(err.graphQLErrors[0].extensions.errors);
    },
  });
  const handleFile = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };
  const submitForm = () => {
    formSubmit({ variables: { file: form.file, title: form.title } });
  };
  const close = () => {
    clearErrors();
    handleClose();
    setForm({ ...error, title: "", file: "" });
    setError({ ...error, title: "", image: "" });
  };
  return (
    <Dialog
      fullWidth={true}
      open={open}
      onClose={close}
      aria-labelledby="responsive-dialog-title"
    >
      <form onSubmit={handleSubmit(submitForm)} noValidate>
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
            inputRef={register({
              required: true,
              isEmpty: () => getValues("title").replace(" ", "").length === 0,
            })}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          {getValues("title")}
          {errors && errors.title?.type === "required" && (
            <Typography variant="body1" color="secondary" align="center">
              Required
            </Typography>
          )}
          {errors && errors.title?.type === "isEmpty" && (
            <Typography variant="body1" color="secondary" align="center">
              Must not be empty
            </Typography>
          )}
          {error && error.title && (
            <Typography variant="body1" color="secondary" align="center">
              {error.title}
            </Typography>
          )}
          <Typography
            color={
              (errors && errors.image) || (error && error.image)
                ? "secondary"
                : "initial"
            }
          >
            Snapshot *
          </Typography>
          <input
            type="file"
            name="image"
            ref={register({ required: true })}
            onChange={handleFile}
          />
          {errors && errors.image && (
            <Typography variant="body1" color="secondary" align="center">
              Please upload an image
            </Typography>
          )}
          {error && error.file && (
            <Typography variant="body1" color="secondary" align="center">
              {error.file}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={close} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={loading || Object.keys(errors).length !== 0}
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
  mutation createPost($file: Upload!, $title: String!) {
    createPost(file: $file, title: $title) {
      _id
      title
      image
      likes
      comments {
        user
        comment
        date
      }
    }
  }
`;

export default connect(null, mapDispatchToProps)(PostForm);
