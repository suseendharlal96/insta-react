const { model, Schema } = require("mongoose");

const postSchema = new Schema(
  {
    image: {
      type: String,
      required: [true, "Image required"],
    },
    userId: {
      type: String,
      required: [true, "Id required"],
    },
    likes: {
      type: [String],
      default: [],
    },
    comments: {
      type: [{ user: String, comment: String, date: String }],
      default: [],
    },
    userprofile: {
      type: String,
      required: [true, "User profile required"],
    },
    title: {
      type: String,
      required: [true, "title required"],
    },
  },
  { timestamps: true }
);

module.exports = model("Post", postSchema);
