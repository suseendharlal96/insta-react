const { UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");

const validate = {
  signup: (email, password, confirmPassword, username) => {
    if (email.trim() === "") {
      throw new UserInputError("Email required", {
        errors: {
          email: "Required",
        },
      });
    } else {
      const regEx = /^([0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-w]*[0-9a-zA-Z].)+[a-zA-Z]{2,9})$/;
      if (!email.match(regEx)) {
        throw new UserInputError("Email required", {
          errors: {
            email: "Invalid Email",
          },
        });
      }
    }
    if (password.trim() === "") {
      throw new UserInputError("pass required", {
        errors: {
          password: "Required",
        },
      });
    }
    if (confirmPassword.trim() === "") {
      throw new UserInputError("confirmPassword required", {
        errors: {
          confirmPassword: "Required",
        },
      });
    } else if (password.trim() !== confirmPassword.trim()) {
      throw new UserInputError("pass mismatch", {
        errors: {
          confirmPassword: "Password mismatch",
        },
      });
    }
    if (username.trim() === "") {
      throw new UserInputError("username required", {
        errors: {
          username: "Required",
        },
      });
    }
  },
  signin: (username, password) => {
    if (username.trim() === "") {
      throw new UserInputError("Username required", {
        errors: {
          username: "Required",
        },
      });
    }
    if (password.trim() === "") {
      throw new UserInputError("Password required", {
        errors: {
          password: "Required",
        },
      });
    }
  },
};

module.exports = {
  Query: {
    signin: async (_, { username, password }) => {
      validate.signin(username, password);
      try {
        const user = await User.findOne({ username });
        if (!user) {
          throw new AuthenticationError("Invalid credentials");
        }
        const isPass = await bcrypt.compare(password, user.password);
        if (!isPass) {
          throw new AuthenticationError("Invalid credentials");
        }
        const token = jwt.sign(
          {
            username,
            password,
          },
          "secretkey",
          { expiresIn: "1h" }
        );
        return { id: user._id, username: user.username, token };
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    signup: async (_, { email, password, confirmPassword, username }) => {
      validate.signup(email, password, confirmPassword, username);
      try {
        const emailExist = await User.findOne({ email });
        if (emailExist) {
          throw new AuthenticationError("email exists");
        }
        const usernameExist = await User.findOne({ username });
        if (usernameExist) {
          throw new AuthenticationError("Username exists");
        }

        const hashPass = await bcrypt.hash(password, 10);
        const token = jwt.sign(
          {
            username,
            password,
          },
          "secretkey",
          { expiresIn: "1h" }
        );
        const newUser = await User.create({
          username,
          email,
          password: hashPass,
        });
        return { id: newUser._id, username, token };
      } catch (err) {
        throw err;
      }
    },
  },
};