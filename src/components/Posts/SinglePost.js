import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { gql, useMutation } from "@apollo/client";

import { Avatar, Card, CardActionArea, makeStyles } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

import CommentForm from "../CommentForm";
import { likePostSuccess } from "../../store/actions/post";

const SinglePost = ({ post }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [openComment, setOpenComment] = useState(false);
  const authData = useSelector((state) => state.authReducer.authData);

  const useStyles = makeStyles(() => ({
    react: {
      cursor: "pointer",
    },
  }));

  const classes = useStyles();
  const [likeunlike, { loading }] = useMutation(LIKE_UNLIKE, {
    onCompleted(data) {
      dispatch(likePostSuccess(data.likeUnlikePost));
    },
    onError(err) {
      console.log(err);
    },
  });
  const isLiked = (likes) => {
    if (likes.length > 0) {
      const a = likes.find((like) => like === authData.id);
      return a ? true : false;
    } else {
      return false;
    }
  };
  return (
    <Card raised={true} className="post">
      <CardActionArea disableRipple>
        <header className="post-header">
          <Avatar
            className="post-avatar"
            alt={post.title}
            src={post.userprofile}
          />
          <h3>{post.title}</h3>
        </header>
        <img className="post-image" src={post.image} alt="logo" />
        <div className="btn-container">
          {authData ? (
            <>
              {isLiked(post.likes) ? (
                <span>
                  {post.likes.length}
                  <FavoriteIcon
                    className={classes.react}
                    color="secondary"
                    onClick={() =>
                      likeunlike({ variables: { postId: post._id.toString() } })
                    }
                  />
                </span>
              ) : (
                <span>
                  {post.likes.length > 0 ? post.likes.length : null}
                  <FavoriteBorderIcon
                    className={classes.react}
                    color="secondary"
                    onClick={() =>
                      likeunlike({ variables: { postId: post._id.toString() } })
                    }
                  />
                </span>
              )}
              <span>
                {post.comments &&
                  post.comments.length > 0 &&
                  post.comments.length}
                <ChatIcon
                  onClick={() => setOpenComment(true)}
                  className={classes.react}
                  color="primary"
                />
              </span>
              <CommentForm
                postId={post._id}
                open={openComment}
                handleClose={() => setOpenComment(false)}
                comments={post.comments}
              />
            </>
          ) : (
            <>
              <span>
                {post.likes.length > 0 ? post.likes.length : null}
                <FavoriteBorderIcon
                  className={classes.react}
                  onClick={() => history.push("/auth")}
                  color="secondary"
                />
              </span>
              <span>
                {post.comments &&
                  post.comments.length > 0 &&
                  post.comments.length}
                <ChatIcon
                  className={classes.react}
                  onClick={() => history.push("/auth")}
                  color="primary"
                />
              </span>
            </>
          )}
        </div>
      </CardActionArea>
    </Card>
  );
};

const LIKE_UNLIKE = gql`
  mutation likeunlike($postId: String!) {
    likeUnlikePost(postId: $postId) {
      _id
      title
      image
      userprofile
      likes
      comments {
        user
        comment
        date
      }
    }
  }
`;

export default SinglePost;
