const initState = {
  posts: [],
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_SUCCESS":
      console.log(action.post);
      console.log(state.posts);
      const tempPosts = [...state.posts];
      tempPosts.push(action.post);
      return {
        ...state,
        posts: tempPosts,
      };
    case "GET_SUCCESS":
      return {
        ...state,
        posts: action.posts,
      };
    default:
      return state;
  }
};

export default postReducer;
