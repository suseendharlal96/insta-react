const initState = {
  authData: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "AUTH_SUCCESS":
      localStorage.setItem("token", action.authData?.token);
      return {
        ...state,
        authData: action.authData,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        authData: null,
      };
    default:
      return state;
  }
};

export default authReducer;
