const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  image: {
    url: String,
    key: String,
  },
});

const Image = mongoose.model("Image", imageSchema);

module.exports = {
  Image,
};
