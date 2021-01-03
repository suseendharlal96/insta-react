import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { gql, useQuery } from "@apollo/client";

import { Grow } from "@material-ui/core";

import "./Post.css";
import SinglePost from "./SinglePost";
import { getPostSuccess } from "../../store/actions/post";

const Post = () => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.postReducer.posts);

  useEffect(() => {
    refetch();
  }, [posts]);

  const { loading, refetch } = useQuery(GET_POSTS, {
    onCompleted(data) {
      dispatch(getPostSuccess(data.getPosts));
    },
    onError(err) {
      console.log(err);
    },
  });

  return loading ? (
    <p>Loading..</p>
  ) : posts.length > 0 ? (
    posts.map((post) => (
      <Grow in>
        <SinglePost post={post} />
      </Grow>
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
      comments {
        user
        comment
        date
      }
      createdAt
    }
  }
`;

export default Post;
