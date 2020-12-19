export const authSuccess = (data) => (dispatch) => {
  dispatch({
    type: "AUTH_SUCCESS",
    authData: data,
  });
};

export const logout = () => (dispatch) => {
  dispatch({
    type: "LOGOUT",
  });
};
