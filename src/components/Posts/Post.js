import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { gql, useQuery, useMutation } from "@apollo/client";

import { Avatar, TextField, Button, makeStyles } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

import "./Post.css";
import { getPostSuccess, likePostSuccess } from "../../store/actions/post";

const Post = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const useStyles = makeStyles(() => ({
    react: {
      cursor: "pointer",
    },
  }));

  const classes = useStyles();

  const posts = useSelector((state) => state.postReducer.posts);
  console.log(posts);
  const authData = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    refetch();
  }, [posts]);

  const { loading, refetch } = useQuery(GET_POSTS, {
    onCompleted(data) {
      console.log(data.getPosts);
      dispatch(getPostSuccess(data.getPosts));
    },
    onError(err) {
      console.log(err);
    },
  });

  const [likeunlike, { loading: likeLoading }] = useMutation(LIKE_UNLIKE, {
    onCompleted(data) {
      dispatch(likePostSuccess(data.likeUnlikePost));
    },
    onError(err) {
      console.log(err);
    },
  });

  const isLiked = (likes) => {
    if (likes.length > 0) {
      console.log(likes);
      const a = likes.find((like) => like === authData.id);
      return a ? true : false;
    } else {
      return false;
    }
  };

  return loading ? (
    <p>Loading..</p>
  ) : posts.length > 0 ? (
    posts.map((post) => (
      <div className="post">
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
              <ChatIcon className={classes.react} color="primary" />
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
              <ChatIcon
                className={classes.react}
                onClick={() => history.push("/auth")}
                color="primary"
              />
            </>
          )}
        </div>
      </div>
    ))
  ) : (
    <p>No data.</p>
  );
};

const GET_POSTS = gql`
  query getPosts {
    getPosts {
      _id
      title
      image
      userprofile
      likes
    }
  }
`;

const LIKE_UNLIKE = gql`
  mutation likeunlike($postId: String!) {
    likeUnlikePost(postId: $postId) {
      _id
      title
      image
      userprofile
      likes
    }
  }
`;

export default Post;
