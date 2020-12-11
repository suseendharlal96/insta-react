import { Avatar } from "@material-ui/core";
import React from "react";
import "./Post.css";

const Post = () => {
  return (
    <div>
      <header className="post-header">
        <Avatar className="post-avatar" alt="Susee" src="/static/images" />
        <h3>Username</h3>
      </header>
      <img className="post-image" src="/react.png" alt="logo" />
      <h4 className="post-text">
        <strong>Susee</strong>Nice post
      </h4>
    </div>
  );
};

export default Post;
