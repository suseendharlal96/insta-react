const initState = {
  authData: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "AUTH_SUCCESS":
      console.log(action.authData);
      return {
        ...state,
        authData: action.authData,
      };
    default:
      return state;
  }
};

export default authReducer;
