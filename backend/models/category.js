const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    max: 32,
  },

  slug: {
    type: String,
    lowercase: true,
    unique: true,
    index: true,
  },

  image: {
    url: String,
    key: String,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = {
  Category,
};
