const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const { ObjectId } = mongoose.Schema;

dotenv.config();

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 32,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      maxlength: 32,
      required: true,
    },

    salt: String,

    hashed_password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "user",
    },

    resetPasswordLink: {
      type: String,
      default: "",
    },

    likes: [
      {
        type: ObjectId,
        ref: "Work",
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods = {
  makeSalt: async function () {
    return await bcrypt.genSalt(10);
  },

  encryptPassword: async function (password) {
    if (!password) return "";
    return await bcrypt.hash(password, this.salt);
  },

  authenticate: async function (plainPassword) {
    return await bcrypt.compare(plainPassword, this.hashed_password);
  },

  generateAuthToken: function () {
    const token = jwt.sign(
      {
        _id: this._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return token;
  },
};

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
