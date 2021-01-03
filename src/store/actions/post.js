export const postSuccess = (data) => (dispatch) => {
  dispatch({
    type: "CREATE_SUCCESS",
    post: data,
  });
};

export const getPostSuccess = (data) => (dispatch) => {
  dispatch({
    type: "GET_SUCCESS",
    posts: data,
  });
};

export const likePostSuccess = (data) => (dispatch) => {
  dispatch({
    type: "LIKE_SUCCESS",
    post: data,
  });
};

export const commentSuccess = (data) => (dispatch) => {
  dispatch({
    type: "COMMENT_SUCCESS",
    post: data,
  });
};
