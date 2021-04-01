const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FilmSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
  },
  description: {
    type: String,
  },
  institution: {
    type: Schema.Types.ObjectId,
    ref: "institutions",
  },
});

module.exports = Film = mongoose.model("films ", FilmSchema);
