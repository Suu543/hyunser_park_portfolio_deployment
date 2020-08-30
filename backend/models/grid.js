const mongoose = require("mongoose");

const gridSchema = new mongoose.Schema({
  image: {
    url: String,
    key: String,
  },
});

const Grid = mongoose.model("Grid", gridSchema);

module.exports = {
  Grid,
};
