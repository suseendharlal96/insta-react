const initState = {
  posts: [],
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_SUCCESS":
      return {
        ...state,
        posts: state.posts.unshift(action.post),
      };
    default:
      return state;
  }
};

export default postReducer;
