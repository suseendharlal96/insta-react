const { AuthenticationError, UserInputError } = require("apollo-server");
const AWS = require("aws-sdk");
const dotenv = require('dotenv')
dotenv.config()

const Post = require("../../models/Post");
const auth = require("../../authMiddleware");

module.exports = {
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
        const newPost = await Post.create({
          image: s3FileUrl + filename,
          userId: req.userId,
          title,
        });
        console.log(newPost);
        return newPost;
      }
    },
  },
};
