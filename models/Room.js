const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RoomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  place_number: {
    type: Number,
  },
  rows: {
    type: Number,
  },
  row_places: {
    type: Number,
  },
  institution: {
    type: Schema.Types.ObjectId,
    ref: "institutions",
  },
});

module.exports = Room = mongoose.model("rooms", RoomSchema);
