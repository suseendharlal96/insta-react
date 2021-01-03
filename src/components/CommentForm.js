import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { useForm } from "react-hook-form";

import { gql, useMutation } from "@apollo/client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";

import { commentSuccess } from "../store/actions/post";

const CommentForm = ({ open, handleClose, comments, postId }) => {
  dayjs.extend(relativeTime);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const { handleSubmit, register, clearErrors, errors } = useForm();

  const submitForm = () => {
    postComment({ variables: { postId, comment } });
  };

  const [postComment, { loading }] = useMutation(COMMENT, {
    onCompleted(data) {
      console.log(data);
      dispatch(commentSuccess(data.commentPost));
      setComment("");
      close();
    },
    onError(err) {
      console.log(err);
    },
  });

  const close = () => {
    clearErrors();
    handleClose();
  };

  return (
    <Dialog
      fullWidth={true}
      open={open}
      onClose={close}
      aria-labelledby="responsive-dialog-title"
    >
      <form onSubmit={handleSubmit(submitForm)} noValidate>
        <DialogTitle id="responsive-dialog-title">
          Comments{comments && comments.length > 0 && `(${comments.length})`}
        </DialogTitle>
        <DialogContent>
          {comments &&
            comments.length > 0 &&
            comments.map((cmnt) => (
              <p style={{ marginBottom: "5px" }}>
                <span style={{ fontWeight: "bold", marginRight: "10px" }}>
                  {cmnt.user}
                </span>
                <span>
                  {cmnt.comment} - {dayjs(cmnt.date).fromNow()}
                </span>
              </p>
            ))}
          <TextField
            autoComplete="off"
            variant="outlined"
            fullWidth
            placeholder="Your thoughts"
            required
            name="comment"
            label="Comment"
            error={errors && errors.comment ? true : false}
            inputRef={register({
              required: true,
            })}
            onChange={(e) => setComment(e.target.value)}
          />
          {errors && errors.comment && (
            <Typography variant="body1" color="secondary" align="center">
              Required
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
            {loading ? "Hold on" : "Post comment"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const COMMENT = gql`
  mutation comment($postId: String!, $comment: String!) {
    commentPost(postId: $postId, comment: $comment) {
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

export default CommentForm;
