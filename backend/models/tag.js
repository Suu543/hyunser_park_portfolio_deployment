const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    unique: true,
    index: true,
    max: 32,
  },
});

const Tag = mongoose.model("Tag", tagSchema);

module.exports = {
  Tag,
};
