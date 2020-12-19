import React, { useState } from "react";
import { Avatar, TextField, Button } from "@material-ui/core";
import FileUpload from "react-file-base64";

import "./Post.css";

const Post = () => {
  const [form, setForm] = useState({
    title: "",
    image: "",
  });
  const submit = (e) => {
    e.preventDefault();
    console.log(form);
  };
  return (
    //
    <div className="post">
      <header className="post-header">
        <Avatar className="post-avatar" alt="Susee" src="/static/images" />
        <h3>Username</h3>
      </header>
      {/* <img className="post-image" src="/react.png" alt="logo" /> */}
      <form onSubmit={submit}>
        <TextField
          variant="outlined"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <FileUpload
          multiple={false}
          onDone={({ base64 }) => setForm({ ...form, image: base64 })}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
      <h4 className="post-text">
        <strong>Susee</strong>Nice post
      </h4>
    </div>
  );
};

export default Post;
