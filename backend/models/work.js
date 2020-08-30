const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const workSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      unique: true,
      index: true,
    },

    image: {
      url: String,
      key: String,
    },

    title: {
      type: String,
      min: 5,
    },

    excerpt: {
      type: String,
      max: 1000,
    },

    artist: {
      type: String,
      required: true,
    },

    body: {
      type: {},
      required: true,
      min: 10,
    },

    created_at: {
      type: Date,
    },

    categories: [
      {
        type: ObjectId,
        ref: "Category",
      },
    ],

    tags: [
      {
        type: ObjectId,
        ref: "Tag",
      },
    ],

    references: [
      {
        type: ObjectId,
        ref: "Reference",
      },
    ],

    like: {
      type: [{ type: ObjectId, ref: "User" }],
    },
  },
  { timestamps: true }
);

const Work = mongoose.model("Work", workSchema);

module.exports = {
  Work,
};
