const Post = require("../../models/Post");
const auth = require("../../authMiddleware");
const { AuthenticationError, UserInputError } = require("apollo-server");

module.exports = {
  Mutation: {
    createPost: async (_, { title, image }, context) => {
      const req = auth(context);
      if (!req.userId) {
        throw new AuthenticationError("Unauthenticated");
      }
      if (title.trim() === "") {
        throw new UserInputError("title required", {
          errors: {
            title: "Required",
          },
        });
      }
      if (image.trim() === "") {
        throw new UserInputError("image required", {
          errors: {
            image: "Required",
          },
        });
      }
      try {
        const newPost = await Post.create({
          image,
          userId: req.userId,
          title,
        });
        console.log(newPost);
        return newPost;
      } catch (err) {
        throw err;
      }
    },
  },
};
