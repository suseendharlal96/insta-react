import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { gql, useQuery } from "@apollo/client";
import { Avatar, TextField, Button } from "@material-ui/core";

import "./Post.css";
import { getPostSuccess } from "../../store/actions/post";

const Post = () => {
  const dispatch = useDispatch();
  const { data, loading } = useQuery(GET_POSTS, {
    onCompleted(data) {
      console.log(data.getPosts);
      dispatch(getPostSuccess(data.getPosts));
    },
    onError(err) {
      console.log(err);
    },
  });
  const posts = useSelector((state) => state.postReducer.posts);
  console.log(posts);
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
        <h4 className="post-text">
          <strong>Susee</strong>Nice post
        </h4>
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
    }
  }
`;

export default Post;
