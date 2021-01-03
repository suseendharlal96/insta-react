const { AuthenticationError, UserInputError } = require("apollo-server");
const AWS = require("aws-sdk");
const dotenv = require("dotenv");
dotenv.config();

const User = require("../../models/User");
const Post = require("../../models/Post");
const auth = require("../../authMiddleware");

module.exports = {
  Query: {
    getPosts: async () => {
      const posts = Post.find({});
      console.log(posts);
      return posts;
    },
  },
  Mutation: {
    createPost: async (_, { title, file }, context) => {
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
      if (!file) {
        throw new UserInputError("image required", {
          errors: {
            image: "Required",
          },
        });
      }
      const { createReadStream, filename, mimetype, encoding } = await file;
      const stream = createReadStream();
      const s3FileUrl = process.env.FILE_URL;
      const s3Bucket = new AWS.S3({
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY,
        region: process.env.REGION,
      });
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: filename,
        Body: stream,
        ContentType: mimetype,
        ACL: "public-read",
      };
      const data = s3Bucket.upload(params, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          if (data) {
            return data;
          }
        }
      });
      console.log(data);
      if (data) {
        const user = await User.findOne({ _id: req.userId });
        const newPost = await Post.create({
          image: s3FileUrl + filename,
          userId: req.userId,
          title,
          userprofile: user.profile,
        });
        console.log(newPost);
        return newPost;
      }
    },
    likeUnlikePost: async (_, { postId }, context) => {
      const req = auth(context);
      if (!req.userId) {
        throw new AuthenticationError("Unauthenticated");
      }
      const post = await Post.findOne({ _id: postId });
      if (post.likes.length > 0) {
        const index = post.likes.findIndex((like) => like === req.userId);
        if (index !== -1) {
          const likes = post.likes.filter((post) => post !== req.userId);
          post.likes = likes;
        } else {
          post.likes.push(req.userId);
        }
      } else {
        post.likes.push(req.userId);
      }
      await post.save();
      console.log(post);
      return post;
    },
    commentPost: async (_, { comment, postId }, context) => {
      const req = auth(context);
      if (!req.userId) {
        throw new AuthenticationError("Unauthenticated");
      }
      const post = await Post.findOne({ _id: postId });
      const user = await User.findOne({ _id: req.userId });
      post.comments.push({
        user: user.username,
        comment,
        date: new Date().toISOString(),
      });
      await post.save();
      return post;
    },
  },
};
