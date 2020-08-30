const mongoose = require("mongoose");

const referenceSchema = new mongoose.Schema({
  url: { type: String, required: true },
  key: { type: String, required: true },
});

const Reference = mongoose.model("Reference", referenceSchema);

module.exports = {
  Reference,
};
