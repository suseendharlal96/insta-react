const initState = {
  posts: [],
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_SUCCESS":
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

    case "LIKE_SUCCESS":
      const postsCopy = [...state.posts];
      const index = postsCopy.findIndex((post) => post._id === action.post._id);
      if (index !== -1) {
        postsCopy[index] = action.post;
      }
      return {
        ...state,
        posts: postsCopy,
      };

    case "COMMENT_SUCCESS":
      const commentsCopy = [...state.posts];
      const postIndex = commentsCopy.findIndex(
        (post) => post._id === action.post._id
      );
      if (postIndex !== -1) {
        commentsCopy[postIndex] = action.post;
      }
      return {
        ...state,
        posts: commentsCopy,
      };

    default:
      return state;
  }
};

export default postReducer;
