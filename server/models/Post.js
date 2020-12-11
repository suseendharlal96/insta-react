const { model, Schema } = require("mongoose");

const postSchema = new Schema({
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
    type: [String],
    default: [],
  },
  title: {
    type: String,
    required: [true, "title required"],
  },
});

module.exports = model("Post", postSchema);
