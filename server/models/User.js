const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username Required"],
    },
    email: {
      type: String,
      required: [true, "email Required"],
    },
    password: {
      type: String,
      required: [true, "password Required"],
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
