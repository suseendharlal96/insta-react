export const postSuccess = (data) => (dispatch) => {
    dispatch({
      type: "CREATE_SUCCESS",
      post: data,
    });
  };
  