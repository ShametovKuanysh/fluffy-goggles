const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create Schema
const InstitutionTypeSchema = new Schema({
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = InstitutionType = mongoose.model(
  "institutiontypes",
  InstitutionTypeSchema
);
