const { UserInputError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AWS = require("aws-sdk");
const dotenv = require("dotenv");
dotenv.config();

const User = require("../../models/User");

const validate = {
  signup: (email, password, confirmPassword, username, profile) => {
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
    if (!profile) {
      throw new UserInputError("profile required", {
        errors: {
          profile: "Required",
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
    signin: async (_, { name, password }) => {
      validate.signin(name, password);
      try {
        const user = await User.findOne({
          $or: [{ username: name }, { email: name }],
        });
        console.log(user);
        if (!user) {
          throw new UserInputError("Invalid credentials", {
            errors: {
              general: "Invalid credentials",
            },
          });
        }
        const isPass = await bcrypt.compare(password, user.password);
        if (!isPass) {
          throw new UserInputError("Invalid credentials", {
            errors: {
              general: "Invalid credentials",
            },
          });
        }
        const token = jwt.sign(
          {
            name,
            id: user._id,
          },
          "secretkey",
          { expiresIn: "1h" }
        );
        return {
          id: user._id,
          username: user.username,
          token,
          profile: user.profile,
        };
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    signup: async (
      _,
      { email, password, confirmPassword, username, profile }
    ) => {
      validate.signup(email, password, confirmPassword, username, profile);
      try {
        const emailExist = await User.findOne({ email });
        if (emailExist) {
          throw new UserInputError("email exists", {
            errors: {
              email: "Email exists",
            },
          });
        }
        const usernameExist = await User.findOne({ username });
        if (usernameExist) {
          throw new UserInputError("Username exists", {
            errors: {
              username: "Username exists",
            },
          });
        }

        const hashPass = await bcrypt.hash(password, 10);

        const { filename, createReadStream, mimetype } = await profile;
        const stream = createReadStream();
        const S3_FILE_URL = process.env.FILE_URL;
        const s3Bucket = new AWS.S3({
          credentials: {
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.SECRET_KEY,
          },
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
            return data;
          }
        });

        if (data) {
          const newUser = await User.create({
            username,
            email,
            password: hashPass,
            profile: S3_FILE_URL + filename,
          });
          const token = jwt.sign(
            {
              username,
              id: newUser._id,
            },
            "secretkey",
            { expiresIn: "1h" }
          );
          return { id: newUser._id, username, token, profile: newUser.profile };
        }
      } catch (err) {
        throw err;
      }
    },
  },
};
